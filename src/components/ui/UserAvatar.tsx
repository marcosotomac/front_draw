import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { User } from "../../types/common";
import { COLOR_CONFIG } from "../../config/constants";

interface UserAvatarProps {
  user: User | null;
  size?: "sm" | "md" | "lg";
  showInfo?: boolean;
  className?: string;
}

export function UserAvatar({
  user,
  size = "md",
  showInfo = false,
  className = "",
}: UserAvatarProps) {
  const sizeConfig = {
    sm: { avatar: "w-8 h-8", text: "text-xs", name: "text-sm" },
    md: { avatar: "w-10 h-10", text: "text-xs", name: "text-sm" },
    lg: { avatar: "w-12 h-12", text: "text-sm", name: "text-base" },
  };

  const config = sizeConfig[size];
  const avatarClasses = className
    ? `${config.avatar} ${className}`
    : config.avatar;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${avatarClasses} rounded-full bg-gradient-to-br ${COLOR_CONFIG.gradients.primary} flex items-center justify-center text-white font-medium shadow-lg`}
      >
        {user?.firstName?.[0] || "U"}
      </div>
      {showInfo && user && (
        <div className="flex-1 min-w-0">
          <div
            className={`font-medium text-foreground truncate ${config.name}`}
          >
            {user.firstName} {user.lastName}
          </div>
          <div className={`text-primary-600 truncate ${config.text}`}>
            {user.email}
          </div>
        </div>
      )}
    </div>
  );
}
