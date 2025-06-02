import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

export function NotificationBell({
  count = 0,
  onClick,
  className = "",
}: NotificationBellProps) {
  return (
    <motion.button
      className={`relative p-2 rounded-lg hover:bg-primary-100/50 transition-colors ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon icon="lucide:bell" className="w-5 h-5 text-primary-600" />
      {count > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </motion.button>
  );
}
