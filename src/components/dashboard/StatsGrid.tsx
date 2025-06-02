import React from "react";
import { motion } from "framer-motion";
import { StatsCard } from "./StatsCard";
import { Stat } from "@/types/common";

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className = "" }: StatsGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {stats.map((stat, index) => (
        <StatsCard key={stat.title} stat={stat} index={index} />
      ))}
    </motion.div>
  );
}
