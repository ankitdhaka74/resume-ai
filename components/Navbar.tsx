"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">
        Resume<span className="text-black">AI</span>
      </h1>

      <div className="hidden md:flex gap-8 text-gray-700 font-medium">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        <Link href="#how">How it Works</Link>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        Login
      </button>
    </nav>
  );
}