import { Bot, User } from "lucide-react";

interface Props {
  role: "assistant" | "user";
}

export default function Avatar({ role }: Props) {
  if (role === "assistant") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <Bot size={20} />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300">
      <User size={18} />
    </div>
  );
}