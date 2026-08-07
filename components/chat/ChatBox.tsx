"use client";

import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Resume AI Coach. Ask me anything about your resume.",
    },
  ]);

  const [input, setInput] = useState("");

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-6 h-[500px] overflow-y-auto rounded-xl border p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "assistant"
                ? "text-left"
                : "text-right"
            }`}
          >
            <div
              className={`inline-block rounded-2xl px-4 py-3 ${
                message.role === "assistant"
                  ? "bg-slate-100"
                  : "bg-blue-600 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your resume..."
          className="flex-1 rounded-xl border p-3"
        />

        <button
          className="rounded-xl bg-blue-600 px-6 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
