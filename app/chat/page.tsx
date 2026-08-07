import ChatBox from "@/components/chat/ChatBox";

export default function ChatPage() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        AI Resume Coach
      </h1>

      <ChatBox />
    </main>
  );
}