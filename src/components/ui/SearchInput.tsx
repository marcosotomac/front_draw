import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Buscar...",
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  return (
    <motion.div
      className={`relative w-full max-w-md ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Icon
        icon="lucide:search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-primary-200/50 bg-content1/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 transition-all"
      />
    </motion.div>
  );
}
