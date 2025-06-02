import React from "react";
import { motion } from "framer-motion";

import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { MobileSidebar } from "./layout/MobileSidebar";
import { StatsGrid } from "./dashboard/StatsGrid";
import { ActivityCard } from "./dashboard/ActivityCard";
import { PopularProductsCard } from "./dashboard/PopularProductsCard";
import { LoadingSpinner } from "./ui/LoadingSpinner";

import { useDashboardData } from "@/hooks/useDashboardData";
import { DASHBOARD_TITLE, DASHBOARD_SUBTITLE } from "@/data/navigation";

export function Dashboard() {
  const { stats, activities, popularProducts, isLoading } = useDashboardData();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-primary-50/20 to-background">
      {/* Sidebar desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 space-y-8">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground">
              {DASHBOARD_TITLE}
            </h1>
            <p className="text-foreground-500 mt-2">{DASHBOARD_SUBTITLE}</p>
          </motion.div>

          {/* Statistics */}
          <StatsGrid stats={stats} />

          {/* Activity and popular products */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ActivityCard activities={activities} className="col-span-2" />
            <PopularProductsCard products={popularProducts} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
