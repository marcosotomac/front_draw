import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { NavItem } from "@/types/common";

interface NavigationItemProps {
  item: NavItem;
  index: number;
  onClick?: () => void;
}

export function NavigationItem({ item, index, onClick }: NavigationItemProps) {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={item.href || "#"}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
            : "text-foreground-600 hover:bg-primary-50 hover:text-primary-700"
        }`}
      >
        <Icon
          icon={item.icon}
          className={`w-5 h-5 transition-colors ${
            isActive
              ? "text-white"
              : "text-primary-500 group-hover:text-primary-600"
          }`}
        />
        <span className={`font-medium ${isActive ? "text-white" : ""}`}>
          {item.label}
        </span>
        {isActive && (
          <motion.div
            className="ml-auto w-2 h-2 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
}
