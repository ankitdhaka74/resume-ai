"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white px-8 py-5">

      <h1 className="text-2xl font-bold text-blue-600">
        Resume<span className="text-black">AI</span>
      </h1>

      <div className="hidden gap-8 font-medium text-gray-700 md:flex">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        <Link href="#how">How it Works</Link>
      </div>

      <Link
        href="/login"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
      >
        Login
      </Link>

    </nav>
  );
}