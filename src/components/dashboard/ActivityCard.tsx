import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Activity } from "@/types/common";

interface ActivityCardProps {
  activities: Activity[];
  className?: string;
}

export function ActivityCard({
  activities,
  className = "",
}: ActivityCardProps) {
  return (
    <motion.div
      className={`bg-content1/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-200/30 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary-100">
          <Icon icon="lucide:activity" className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Actividad Reciente
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex justify-between items-center bg-primary-50/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary-200/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div>
              <div className="text-foreground">
                <span className="font-medium text-primary-700">
                  {item.usuario}
                </span>{" "}
                <span className="text-foreground-600">{item.accion}</span>
              </div>
              <div className="text-primary-600 text-sm font-medium mt-1">
                {item.detalle}
              </div>
            </div>
            <div className="text-xs text-foreground-400 bg-content1/50 px-2 py-1 rounded-md">
              {item.tiempo}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
