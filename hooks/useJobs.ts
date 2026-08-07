"use client";

import { useEffect, useState } from "react";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: string;
  jobLink?: string;
  notes?: string;
  createdAt: string;
}

export default function useJobs() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    const res = await fetch("/api/jobs");

    const text = await res.text();

    console.log("API Response:", text);

    if (!res.ok) {
    throw new Error(text);
    }

    const data = JSON.parse(text);

    setJobs(data);
    setLoading(false);

    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    loading,
    refresh: loadJobs,
  };
}