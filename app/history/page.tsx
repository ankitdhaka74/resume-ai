import HistoryTable from "@/components/history/HistoryTable";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold">
          Resume History
        </h1>

        <HistoryTable />
      </div>
    </main>
  );
}