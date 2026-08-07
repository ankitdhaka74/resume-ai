import HistoryTable from "@/components/history/HistoryTable";

export default function HistoryPage() {
  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">Resume History</h1>

        <p className="mt-2 text-slate-500">
          View all your previous resume analyses.
        </p>
      </div>

      <HistoryTable />
    </main>
  );
}