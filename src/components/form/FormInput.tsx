import React from "react";
import { Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: string;
  icon?: string;
  isRequired?: boolean;
  endContent?: React.ReactNode;
  errorMessage?: string;
  delay?: number;
}

export function FormInput({
  label,
  placeholder,
  value,
  onValueChange,
  type = "text",
  icon,
  isRequired = false,
  endContent,
  errorMessage,
  delay = 0,
}: FormInputProps) {
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
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        onValueChange={onValueChange}
        isRequired={isRequired}
        variant="bordered"
        radius="sm"
        startContent={
          icon && <Icon icon={icon} className="text-default-400 text-lg" />
        }
        endContent={endContent}
        errorMessage={errorMessage}
        classNames={{
          inputWrapper: "bg-content1/50 backdrop-blur-sm border-content3",
        }}
      />
    </motion.div>
  );
}
