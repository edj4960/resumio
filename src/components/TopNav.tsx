"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProfile } from "@/components/ProfileProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/edit", label: "Edit" },
  { href: "/preview", label: "Preview" },
  { href: "/export", label: "Export" },
];

export default function TopNav() {
  const { profiles, profileId, setActiveProfile, createProfile, isReady } =
    useProfile();
  const [showModal, setShowModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [error, setError] = useState("");

  const profileOptions = useMemo(() => {
    if (profiles.length > 0) {
      return profiles;
    }
    return [{ profileId: "default", updatedAt: "" }];
  }, [profiles]);

  const handleCreate = async () => {
    const result = await createProfile(newProfileName);
    if (!result.ok) {
      setError(result.error ?? "Unable to create profile.");
      return;
    }
    setNewProfileName("");
    setError("");
    setShowModal(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm print-hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6">
        <div className="flex-1">
          <Link className="btn btn-ghost text-lg font-semibold" href="/">
            Resume Builder
          </Link>
        </div>
        <div className="flex-none items-center gap-2">
          <div className="form-control">
            <select
              className="select select-bordered select-sm"
              value={profileId}
              onChange={(event) => void setActiveProfile(event.target.value)}
              disabled={!isReady}
            >
              {profileOptions.map((profile) => (
                <option key={profile.profileId} value={profile.profileId}>
                  {profile.profileId}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={() => setShowModal(true)}
          >
            New profile
          </button>
          {navItems.map((item) => (
            <Link key={item.href} className="btn btn-ghost" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {showModal ? (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-semibold">Create a profile</h3>
            <p className="text-sm text-base-content/70">
              Create a new profile ID to store another resume.
            </p>
            <div className="mt-4 space-y-3">
              <label className="form-control">
                <span className="label-text">Profile ID</span>
                <input
                  className="input input-bordered"
                  value={newProfileName}
                  onChange={(event) => {
                    setNewProfileName(event.target.value);
                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="e.g. freelance"
                />
              </label>
              {error ? (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              ) : null}
            </div>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
