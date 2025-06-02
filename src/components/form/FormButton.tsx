import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  isLoading?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  className?: string;
  onClick?: () => void;
  delay?: number;
  disabled?: boolean;
}

export function FormButton({
  type = "button",
  children,
  isLoading = false,
  color = "primary",
  variant = "shadow",
  className = "",
  onClick,
  delay = 0,
  disabled = false,
}: FormButtonProps) {
  const formControls = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={formControls} initial="hidden" animate="visible">
      <Button
        type={type}
        color={color}
        className={`w-full ${className}`}
        isLoading={isLoading}
        radius="sm"
        variant={variant}
        onClick={onClick}
        isDisabled={disabled}
      >
        {children}
      </Button>
    </motion.div>
  );
}
