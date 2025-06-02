import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { UserAvatar } from "./ui/UserAvatar";
import { NavigationMenu } from "./navigation/NavigationMenu";

import { useAuth } from "@/hooks/useAuth";
import { NAVIGATION_ITEMS } from "@/data/navigation";

export function Sidebar() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="bg-content1/90 backdrop-blur-sm border-r border-primary-200/50 w-64 min-h-screen flex flex-col shadow-xl">
      {/* Logo y branding */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-6 py-6 border-b border-primary-200/30"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-2 rounded-lg shadow-lg">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Icon className="text-white w-6 h-6" icon="lucide:recycle" />
          </motion.div>
        </div>
        <div>
          <div className="font-bold text-lg text-foreground">GreenLoop</div>
          <div className="text-xs text-primary-600 font-medium">
            Economía Circular
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <NavigationMenu items={NAVIGATION_ITEMS} />

      {/* User section y logout */}
      <div className="border-t border-primary-200/30 p-4 space-y-3">
        {/* User info */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-primary-50/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <UserAvatar size="md" user={user} />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground text-sm truncate">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-primary-600 text-xs truncate">
              {user?.username}
            </div>
          </div>
        </motion.div>

        {/* Logout button */}
        <motion.button
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
        >
          <Icon
            className="w-5 h-5 text-red-500 group-hover:text-red-600"
            icon="lucide:log-out"
          />
          <span className="font-medium">Cerrar sesión</span>
        </motion.button>
      </div>
    </aside>
  );
}
