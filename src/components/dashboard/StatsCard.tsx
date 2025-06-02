import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Stat } from "../../types/common";
import { fadeInUp } from "../../utils/animations";
import { COLOR_CONFIG } from "../../config/constants";

interface StatsCardProps {
  stat: Stat;
  index: number;
}

export function StatsCard({ stat, index }: StatsCardProps) {
  return (
    <motion.div
      className={`rounded-xl p-5 bg-gradient-to-br ${stat.color} ${COLOR_CONFIG.shadows.card} border border-primary-200/20 backdrop-blur-sm`}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-foreground-500 text-sm font-medium">
            {stat.title}
          </div>
          <div className="text-2xl font-bold text-foreground mt-1">
            {stat.value}
          </div>
          <div className="text-xs text-primary-600 mt-2 font-medium">
            {stat.change}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-white/50 backdrop-blur-sm">
          <Icon icon={stat.icon} className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </motion.div>
  );
}
