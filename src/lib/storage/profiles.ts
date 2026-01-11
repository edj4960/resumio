import { getDb, dbConfig } from "@/lib/storage/db";
import { defaultResume, resumeSchema } from "@/lib/schema/resume";
import type { Resume } from "@/lib/schema/resume";

export type StoredProfile = {
  profileId: string;
  resume: Resume;
  updatedAt: string;
};

export type ProfileListItem = {
  profileId: string;
  updatedAt: string;
};

export async function getProfile(profileId: string) {
  const db = await getDb();
  const record = (await db.get(dbConfig.STORE_NAME, profileId)) as
    | StoredProfile
    | undefined;

  if (!record) {
    return {
      profile: {
        profileId,
        resume: defaultResume,
        updatedAt: new Date().toISOString(),
      },
      isValid: true,
    };
  }

  const parsed = resumeSchema.safeParse(record.resume);
  if (!parsed.success) {
    return {
      profile: {
        profileId,
        resume: defaultResume,
        updatedAt: record.updatedAt ?? new Date().toISOString(),
      },
      isValid: false,
    };
  }

  return {
    profile: {
      profileId,
      resume: parsed.data,
      updatedAt: record.updatedAt,
    },
    isValid: true,
  };
}

export async function saveProfile(
  profileId: string,
  resume: Resume,
  updatedAt: string,
) {
  const db = await getDb();
  const record: StoredProfile = { profileId, resume, updatedAt };
  await db.put(dbConfig.STORE_NAME, record);
  return record;
}

export async function listProfiles(): Promise<ProfileListItem[]> {
  const db = await getDb();
  const records = (await db.getAll(dbConfig.STORE_NAME)) as StoredProfile[];

  return records
    .map((record) => ({
      profileId: record.profileId,
      updatedAt: record.updatedAt,
    }))
    .sort((a, b) => a.profileId.localeCompare(b.profileId));
}

export async function deleteProfile(profileId: string) {
  const db = await getDb();
  await db.delete(dbConfig.STORE_NAME, profileId);
}
