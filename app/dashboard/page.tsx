import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentResume from "@/components/dashboard/RecentResume";
import Suggestions from "@/components/dashboard/Suggestions";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        <DashboardHeader />

        <StatsCards />

        <RecentResume />

        <Suggestions />
      </main>
    </div>
  );
}