"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Props {
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const suggestions = [
  "Improve my resume",
  "Explain ATS score",
  "Review my projects",
  "Generate interview questions",
];

const tabs = [
  "Chat",
  "Analyze",
  "Improve",
  "Cover Letter",
  "Interview",
  "ATS",
];

const welcomeMessages: Record<string, string> = {
  Chat: "Ask me anything about your resume.",
  Analyze: "I'll explain your ATS analysis.",
  Improve: "I'll help improve your resume.",
  "Cover Letter": "I'll create a professional cover letter.",
  Interview: "I'll prepare interview questions.",
  ATS: "Let's improve your ATS score.",
};

const defaultWelcome: Message = {
  role: "assistant",
  content: `# 👋 Welcome!

I can help you with:

- Resume Review
- ATS Score
- Resume Improvement
- Cover Letter
- Interview Questions

Ask me anything!`,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export default function ResumeCoachWindow({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState("Chat");

  const [messages, setMessages] = useState<Message[]>([defaultWelcome]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("resume-chat");

    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("resume-chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, streamingText]);

  const streamResponse = async (text: string) => {
    setStreamingText("");

    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 12));

      setStreamingText(text.slice(0, i));
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setStreamingText("");
  };

  const sendMessage = async (overrideText?: string) => {
    const question = overrideText ?? input;
    if (!question.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
          message: question,
        }),
      });

      const data = await res.json();

      setLoading(false);
      await streamResponse(data.reply || "Sorry, I couldn't generate a response.");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("Clear conversation?")) {
      setMessages([defaultWelcome]);
    }
  };

  const isEmptyState = messages.length === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="
        fixed
        bottom-0
        right-0
        sm:bottom-28
        sm:right-6
        z-50
        flex
        h-[100vh]
        sm:h-[600px]
        w-full
        max-w-[380px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-white/20
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
        <div>
          <h2 className="text-lg font-bold">🤖 Resume AI Coach</h2>
          <p className="text-sm opacity-90">Online • Ready to help</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="rounded-lg p-2 transition hover:bg-white/10"
            title="Clear conversation"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b bg-slate-50/80">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-5">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-5 flex gap-3 ${
              msg.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                🤖
              </div>
            )}

            <div>
              <p className="mb-1 text-xs font-semibold text-slate-500">
                {msg.role === "assistant" ? "Resume AI" : "You"}
              </p>

              <div
                className={`max-w-[260px] rounded-2xl px-4 py-3 ${
                  msg.role === "assistant"
                    ? "bg-white/90 shadow"
                    : "bg-blue-600 text-white"
                }`}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-2 text-xl font-bold">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 text-lg font-bold">{children}</h2>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 leading-7">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 list-disc pl-5">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 list-decimal pl-5">{children}</ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    code: ({ children }) => (
                      <code className="rounded bg-slate-200 px-1">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>

                {msg.role === "assistant" && (
                  <button
                    onClick={() => navigator.clipboard.writeText(msg.content)}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    📋 Copy
                  </button>
                )}
              </div>

              <p
                className={`mt-1 text-xs text-slate-400 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {msg.time}
              </p>
            </div>

            {msg.role === "user" && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300">
                👤
              </div>
            )}
          </motion.div>
        ))}

        {streamingText && (
          <div className="mb-5 flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
              🤖
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold text-slate-500">
                Resume AI
              </p>

              <div className="max-w-[260px] rounded-2xl bg-white px-4 py-3 shadow">
                {streamingText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="rounded-2xl bg-white/90 px-4 py-3 shadow">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                Resume AI is typing
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {isEmptyState && (
        <div className="px-5 pb-5">
          <p className="mb-3 text-sm font-semibold">Suggested Questions</p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="rounded-full border px-3 py-2 text-sm hover:bg-blue-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t bg-white/90 p-4">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder={
              activeTab === "Chat"
                ? "Ask anything..."
                : `Ask about ${activeTab}...`
            }
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}