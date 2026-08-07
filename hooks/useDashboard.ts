"use client";

import { useEffect, useState } from "react";

export interface DashboardData {
  total: number;
  averageATS: number;
  bestATS: number;

  latestResume: {
    fileName: string;
    atsScore: number;
    summary: string;
    createdAt: string;
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
        const res = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: DashboardData = await res.json();
        setData(json);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return { data, loading };
}