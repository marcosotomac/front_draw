import { NavItem } from "@/types/common";

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: "lucide:layout-dashboard", href: "/dashboard" },
  { label: "Publicaciones", icon: "lucide:file-text", href: "/publicaciones" },
  { label: "Chat", icon: "lucide:message-circle", href: "/chat" },
  { label: "Notificaciones", icon: "lucide:bell", href: "/notificaciones" },
  { label: "Donaciones", icon: "lucide:heart", href: "/donaciones" },
  { label: "Wishlist", icon: "lucide:star", href: "/wishlist" },
  { label: "Productos", icon: "lucide:package", href: "/productos" },
  { label: "Reportes", icon: "lucide:flag", href: "/reportes" },
  { label: "Comunidad", icon: "lucide:users-round", href: "/comunidad" },
  { label: "Intercambio", icon: "lucide:repeat", href: "/intercambio" },
  { label: "Mensajería", icon: "lucide:mail", href: "/mensajeria" },
];

export const DASHBOARD_TITLE = "Dashboard";
export const DASHBOARD_SUBTITLE =
  "Bienvenido a tu panel de control de GreenLoop";
