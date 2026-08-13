"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  User,
  Mail,
  Camera,
  Save,
  LogOut,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();

  const [name, setName] = useState(
    session?.user?.name ?? ""
  );

  const [saving, setSaving] = useState(false);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-8 w-40 animate-pulse rounded bg-slate-100" />
            <div className="mt-8 h-24 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Please login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You need to be logged in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to update profile."
        );
      }

      await update({
        name: data.user.name,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const displayName =
    session.user.name || "User";

  const initial =
    displayName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information and account.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

          {/* Profile information */}
          <div className="px-6 pb-8 md:px-8">

            <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar */}
              <div className="relative">

                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={displayName}
                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-600 shadow-md">
                    {initial}
                  </div>
                )}

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                  title="Change profile photo"
                >
                  <Camera size={16} />
                </button>

              </div>

              {/* User name */}
              <div className="sm:pb-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {displayName}
                </h2>

                <p className="text-sm text-slate-500">
                  {session.user.email}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the information associated with your account.
            </p>
          </div>

          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={session.user.email ?? ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-500"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Your email address cannot be changed here.
              </p>
            </div>

            {/* Save */}
            <div className="flex justify-end border-t border-slate-100 pt-6">

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Account */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <h2 className="text-xl font-bold text-slate-900">
            Account
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account session.
          </p>

          <div className="mt-6 border-t border-slate-100 pt-6">

            <button
              type="button"
              onClick={() => signOut({
                callbackUrl: "/login",
              })}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Sign Out
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}