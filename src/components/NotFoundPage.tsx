import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthContext";

export function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? "/dashboard" : "/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Icon
            icon="lucide:alert-circle"
            className="w-24 h-24 mx-auto text-danger"
          />
        </motion.div>

        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Página no encontrada
        </h2>
        <p className="text-foreground-500">
          La página que buscas no existe o no tienes permiso para acceder a
          ella.
        </p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-foreground-500">
              {isAuthenticated
                ? "Redirigiendo al dashboard"
                : "Redirigiendo a la página de inicio de sesión"}
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Icon
                icon="lucide:loader-2"
                className="w-5 h-5 text-primary animate-spin"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
