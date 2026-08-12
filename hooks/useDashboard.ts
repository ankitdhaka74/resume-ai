"use client";

import { useEffect, useState } from "react";

export interface DashboardData {
  total: number;
  averageATS: number;
  bestATS: number;

  latestResume: {
    id: string;
    fileName: string;
    atsScore: number;
    summary: string;
    createdAt: string;
    jobMatch: number | null;
  } | null;

  chart: {
    date: string;
    ats: number;
  }[];

  monthly: {
    month: string;
    count: number;
  }[];
}

export default function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    total: 0,
    averageATS: 0,
    bestATS: 0,
    latestResume: null,
    chart: [],
    monthly: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const res = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(
            json.error || `HTTP ${res.status}`
          );
        }

        setData(json);
      } catch (error) {
        console.error(
          "Dashboard fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return {
    data,
    loading,
  };
}