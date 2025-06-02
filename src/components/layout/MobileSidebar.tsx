import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../Sidebar";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            aria-label="Cerrar menú lateral"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onClose();
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-64 h-full bg-content1/95 backdrop-blur-sm shadow-xl border-r border-primary-200/50"
          >
            <Sidebar />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
