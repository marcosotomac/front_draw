import React from "react";
import { SearchInput } from "../ui/SearchInput";
import { NotificationBell } from "../ui/NotificationBell";
import { UserAvatar } from "../ui/UserAvatar";
import { MobileMenuButton } from "../ui/MobileMenuButton";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}

export function DashboardHeader({
  onMenuToggle,
  className = "",
}: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header
      className={`flex items-center justify-between px-4 md:px-8 py-4 bg-content1/80 backdrop-blur-sm border-b border-primary-200/50 ${className}`}
    >
      <MobileMenuButton onClick={onMenuToggle} />

      <div className="flex items-center gap-4 w-full">
        <SearchInput placeholder="Buscar en GreenLoop..." />
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell count={3} />
        <UserAvatar user={user} className="w-9 h-9" />
      </div>
    </header>
  );
}
