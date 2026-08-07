"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function UserMenu({
  name,
  email,
  image,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={image || "/avatar.png"}
        alt="profile"
        className="h-11 w-11 rounded-full border"
      />

      <div className="hidden md:block">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-500">{email}</p>
      </div>

      <Button
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}