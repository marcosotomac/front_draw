import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PopularItem } from "@/types/common";

interface PopularProductsCardProps {
  products: PopularItem[];
  className?: string;
}

export function PopularProductsCard({
  products,
  className = "",
}: PopularProductsCardProps) {
  return (
    <motion.div
      className={`bg-content1/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-200/30 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary-100">
          <Icon
            icon="lucide:trending-up"
            className="w-5 h-5 text-primary-600"
          />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Productos Populares
        </h2>
      </div>

      <div className="space-y-4">
        {products.map((prod, idx) => (
          <motion.div
            key={prod.nombre}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50/50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                {idx + 1}
              </div>
              <div>
                <div className="font-medium text-foreground">{prod.nombre}</div>
                <span className="text-xs bg-primary-100 text-primary-700 rounded-full px-3 py-1 font-medium">
                  {prod.categoria}
                </span>
              </div>
            </div>
            <span className="text-primary-600 font-semibold text-sm">
              {prod.cantidad} intercambios
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
