import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentResume from "@/components/dashboard/RecentResume";
import Suggestions from "@/components/dashboard/Suggestions";
import ATSChart from "@/components/dashboard/ATSChart";
import HistoryPreview from "@/components/dashboard/HistoryPreview";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import QuickActions from "@/components/dashboard/QuickActions";
import ResumeCoachWidget from "@/components/chat/ResumeCoachWidget";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 space-y-8 p-8">
        <DashboardHeader />

        <StatsCards />

        <div className="grid gap-8 xl:grid-cols-2">
          <ATSChart />
          <MonthlyChart />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <RecentResume />
          <Suggestions />
        </div>

        <div className="grid gap-8 xl:grid-cols-2">
          <HistoryPreview />
          <QuickActions />
        </div>
      </main>

      {/* Floating Resume AI Chat */}
      <ResumeCoachWidget />
    </div>
  );
}