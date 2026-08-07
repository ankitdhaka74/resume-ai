"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ResumeCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Resume AI Coach. Ask me anything about your resume.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/resume-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <Bot className="h-7 w-7 text-blue-600" />
        <h2 className="text-2xl font-bold">
          AI Resume Coach
        </h2>
      </div>

      <div className="mb-6 h-72 overflow-y-auto rounded-xl border p-4">
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
              className={`inline-block max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "assistant"
                  ? "bg-slate-100 dark:bg-slate-800"
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask anything about your resume..."
          className="flex-1 rounded-xl border p-3"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}