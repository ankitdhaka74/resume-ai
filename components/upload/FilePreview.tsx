"use client";

import { FileText, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File | null;
  onRemove: () => void;
}

export default function FilePreview({
  file,
  onRemove,
}: FilePreviewProps) {
  if (!file) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-3">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {file.name}
            </h3>

            <p className="text-sm text-slate-500">
              {file.type.includes("pdf") ? "PDF" : "DOCX"} •{" "}
              {(file.size / 1024).toFixed(1)} KB
            </p>

            <div className="mt-2 flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">
                Ready to Analyze
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={onRemove}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </div>
    </div>
  );
}