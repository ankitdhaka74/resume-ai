import UploadBox from "@/components/upload/UploadBox";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">

      <h1 className="text-5xl font-bold text-center">
        Upload Your Resume
      </h1>

      <p className="text-center text-gray-500 mt-4 mb-12">
        Upload your resume and receive an AI-powered ATS analysis.
      </p>

      <UploadBox />

    </main>
  );
}