import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MobileMenuButton({
  isOpen = false,
  onClick,
  className = "",
}: MobileMenuButtonProps) {
  return (
    <motion.button
      className={`md:hidden p-2 rounded-lg hover:bg-primary-100/50 transition-colors ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          icon={isOpen ? "lucide:x" : "lucide:menu"}
          className="w-6 h-6 text-primary-600"
        />
      </motion.div>
    </motion.button>
  );
}
