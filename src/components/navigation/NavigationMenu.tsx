import React from "react";
import { NavigationItem } from "./NavigationItem";
import { NavItem } from "@/types/common";

interface NavigationMenuProps {
  items: NavItem[];
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

export function NavigationMenu({
  items,
  onItemClick,
  className = "",
}: NavigationMenuProps) {
  return (
    <nav className={`flex-1 px-3 py-4 space-y-1 ${className}`}>
      {items.map((item, index) => (
        <NavigationItem
          key={item.label}
          item={item}
          index={index}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </nav>
  );
}
