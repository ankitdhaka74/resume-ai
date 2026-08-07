"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  history: {
    id: string;
    fileName: string;
    atsScore: number;
    jobMatch?: number;
    createdAt: string;
  };
}

export default function HistoryRow({ history }: Props) {
  const handleDelete = async () => {
    const ok = confirm("Delete this resume history?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/history/${history.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete.");
      }

      toast.success("Resume deleted successfully!");

      window.location.reload();
    } catch {
      toast.error("Failed to delete resume.");
    }
  };

  return (
    <tr className="border-t">
      <td className="p-4">{history.fileName}</td>

      <td className="p-4 text-center">
        {history.atsScore}%
      </td>

      <td className="p-4 text-center">
        {history.jobMatch ?? "-"}%
      </td>

      <td className="p-4 text-center">
        {new Date(history.createdAt).toLocaleDateString()}
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-2">
          <Link
            href={`/history/${history.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}