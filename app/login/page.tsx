"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithCredentials = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid email or password.");
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl dark:bg-slate-900">

        <h1 className="text-center text-4xl font-bold">
          Resume AI
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Analyze. Improve. Get Hired.
        </p>

        {/* Email Login */}
        <div className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border p-3"
          />

          <Button
            className="h-12 w-full bg-blue-600 hover:bg-blue-700"
            onClick={loginWithCredentials}
          >
            Login
          </Button>

        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-300"></div>
          <span className="mx-4 text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-300"></div>
        </div>

        {/* Google */}
        <Button
          className="mb-3 h-12 w-full"
          variant="outline"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          <FcGoogle className="mr-3 h-5 w-5" />
          Continue with Google
        </Button>

        {/* GitHub */}
        <Button
          className="h-12 w-full"
          variant="outline"
          onClick={() =>
            signIn("github", {
              callbackUrl: "/dashboard",
            })
          }
        >
          <FaGithub className="mr-3 h-5 w-5" />
          Continue with GitHub
        </Button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600"
          >
            Create Account
          </Link>
        </p>

      </div>
    </main>
  );
}