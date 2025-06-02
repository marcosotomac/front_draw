import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { APP_CONFIG, COLOR_CONFIG } from "../../config/constants";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
}

export function BrandLogo({
  size = "md",
  showText = true,
  animated = true,
}: BrandLogoProps) {
  const sizeConfig = {
    sm: { icon: "w-5 h-5", text: "text-lg", container: "p-1.5" },
    md: { icon: "w-6 h-6", text: "text-xl", container: "p-2" },
    lg: { icon: "w-8 h-8", text: "text-2xl", container: "p-3" },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`bg-gradient-to-br ${COLOR_CONFIG.gradients.primary} ${config.container} rounded-lg shadow-lg`}
      >
        {animated ? (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Icon
              icon="lucide:recycle"
              className={`text-white ${config.icon}`}
            />
          </motion.div>
        ) : (
          <Icon icon="lucide:recycle" className={`text-white ${config.icon}`} />
        )}
      </div>
      {showText && (
        <div>
          <div className={`font-bold text-foreground ${config.text}`}>
            {APP_CONFIG.name}
          </div>
          <div className="text-xs text-primary-600 font-medium">
            {APP_CONFIG.description}
          </div>
        </div>
      )}
    </div>
  );
}
