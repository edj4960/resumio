"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Resume } from "@/lib/schema/resume";
import { defaultResume } from "@/lib/schema/resume";
import {
  deleteProfile as removeProfile,
  getProfile,
  listProfiles,
  saveProfile,
  type ProfileListItem,
} from "@/lib/storage/profiles";

const ACTIVE_PROFILE_KEY = "resume_builder:active_profile";
const DEFAULT_PROFILE_ID = "default";

type ProfileContextValue = {
  profileId: string;
  resume: Resume;
  updatedAt: string | null;
  isValid: boolean;
  saving: boolean;
  lastSavedAt: string | null;
  profiles: ProfileListItem[];
  isReady: boolean;
  setActiveProfile: (profileId: string) => Promise<void>;
  createProfile: (profileId: string) => Promise<{ ok: boolean; error?: string }>;
  deleteProfile: (profileId: string) => Promise<void>;
  resetProfile: () => Promise<void>;
  updateResume: (resume: Resume) => void;
  saveActiveProfile: (resume?: Resume) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ProfileListItem[]>([]);
  const [profileId, setProfileId] = useState(DEFAULT_PROFILE_ID);
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const refreshProfiles = useCallback(async () => {
    const list = await listProfiles();
    setProfiles(list);
    return list;
  }, []);

  const loadProfile = useCallback(async (nextProfileId: string) => {
    const { profile, isValid: nextValid } = await getProfile(nextProfileId);
    setProfileId(profile.profileId);
    setResume(profile.resume);
    setUpdatedAt(profile.updatedAt);
    setIsValid(nextValid);
    setLastSavedAt(profile.updatedAt);
  }, []);

  useEffect(() => {
    const init = async () => {
      let list = await refreshProfiles();

      if (list.length === 0) {
        const now = new Date().toISOString();
        await saveProfile(DEFAULT_PROFILE_ID, defaultResume, now);
        list = await refreshProfiles();
      }

      const storedActive =
        typeof window === "undefined"
          ? null
          : window.localStorage.getItem(ACTIVE_PROFILE_KEY);
      const activeFromStorage = storedActive || DEFAULT_PROFILE_ID;
      const exists = list.some((item) => item.profileId === activeFromStorage);
      const nextProfileId = exists ? activeFromStorage : DEFAULT_PROFILE_ID;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACTIVE_PROFILE_KEY, nextProfileId);
      }

      await loadProfile(nextProfileId);
      setIsReady(true);
    };

    void init();
  }, [loadProfile, refreshProfiles]);

  const setActiveProfile = useCallback(
    async (nextProfileId: string) => {
      await loadProfile(nextProfileId);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACTIVE_PROFILE_KEY, nextProfileId);
      }
    },
    [loadProfile],
  );

  const createProfile = useCallback(
    async (nextProfileId: string) => {
      const trimmed = nextProfileId.trim();
      if (!trimmed) {
        return { ok: false, error: "Profile name is required." };
      }
      if (profiles.some((item) => item.profileId === trimmed)) {
        return { ok: false, error: "Profile already exists." };
      }
      const now = new Date().toISOString();
      await saveProfile(trimmed, defaultResume, now);
      await refreshProfiles();
      await setActiveProfile(trimmed);
      return { ok: true };
    },
    [profiles, refreshProfiles, setActiveProfile],
  );

  const deleteProfile = useCallback(
    async (targetProfileId: string) => {
      if (targetProfileId === DEFAULT_PROFILE_ID) {
        return;
      }
      await removeProfile(targetProfileId);
      const list = await refreshProfiles();

      if (targetProfileId === profileId) {
        const fallback =
          list.find((item) => item.profileId === DEFAULT_PROFILE_ID) ||
          list[0];
        if (fallback) {
          await setActiveProfile(fallback.profileId);
        }
      }
    },
    [profileId, refreshProfiles, setActiveProfile],
  );

  const resetProfile = useCallback(async () => {
    const now = new Date().toISOString();
    setResume(defaultResume);
    setUpdatedAt(now);
    setLastSavedAt(now);
    setIsValid(true);
    await saveProfile(profileId, defaultResume, now);
    await refreshProfiles();
  }, [profileId, refreshProfiles]);

  const updateResume = useCallback((nextResume: Resume) => {
    setResume(nextResume);
  }, []);

  const saveActiveProfile = useCallback(
    async (nextResume?: Resume) => {
      const payload = nextResume ?? resume;
      const now = new Date().toISOString();
      setSaving(true);
      try {
        await saveProfile(profileId, payload, now);
        setUpdatedAt(now);
        setLastSavedAt(now);
        await refreshProfiles();
      } finally {
        setSaving(false);
      }
    },
    [profileId, refreshProfiles, resume],
  );

  const value = useMemo(
    () => ({
      profileId,
      resume,
      updatedAt,
      isValid,
      saving,
      lastSavedAt,
      profiles,
      isReady,
      setActiveProfile,
      createProfile,
      deleteProfile,
      resetProfile,
      updateResume,
      saveActiveProfile,
    }),
    [
      profileId,
      resume,
      updatedAt,
      isValid,
      saving,
      lastSavedAt,
      profiles,
      isReady,
      setActiveProfile,
      createProfile,
      deleteProfile,
      resetProfile,
      updateResume,
      saveActiveProfile,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider.");
  }
  return context;
}
