"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadDropzoneProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
}

export default function UploadDropzone({
  file,
  setFile,
  loading,
}: UploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive, open } =
    useDropzone({
      onDrop,
      multiple: false,
      noClick: true,
      maxSize: 5 * 1024 * 1024,
      disabled: loading,
      accept: {
        "application/pdf": [".pdf"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
      },
    });

  return (
    <div
      {...getRootProps()}
      className={`rounded-3xl border-2 border-dashed p-14 text-center transition-all ${
        isDragActive
          ? "border-blue-600 bg-blue-50"
          : "border-slate-300 bg-white dark:bg-slate-900"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mx-auto h-16 w-16 text-blue-600" />

      <h2 className="mt-6 text-3xl font-bold">
        Upload Your Resume
      </h2>

      <p className="mt-2 text-slate-500">
        PDF or DOCX • Max 5 MB
      </p>

      {file && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-green-100 p-3">
                        📄
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            {file.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {(file.size / 1024).toFixed(1)} KB
                        </p>

                        <p className="mt-1 text-sm text-green-600">
                            ✓ Ready to analyze
                        </p>
                        </div>

                    </div>

                    <Button
                        variant="outline"
                        onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        }}
                    >
                        Remove
                    </Button>

                    </div>
                </div>
                )}

      <Button
        className="mt-8"
        onClick={open}
      >
        Browse Resume
      </Button>
    </div>
  );
}