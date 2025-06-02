import React from "react";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?:
    | "current"
    | "white"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  color = "primary",
  label,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <Spinner color={color} size={size} />
      {label && (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-foreground-500"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  );
}

interface FullPageLoadingProps {
  message?: string;
}

export function FullPageLoading({
  message = "Loading...",
}: FullPageLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner
        className="bg-content1 p-8 rounded-large shadow-large"
        label={message}
        size="lg"
      />
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({
  message = "Loading...",
  className = "",
}: PageLoadingProps) {
  return (
    <div
      className={`min-h-[400px] flex items-center justify-center ${className}`}
    >
      <LoadingSpinner label={message} size="lg" />
    </div>
  );
}

interface SectionLoadingProps {
  message?: string;
  className?: string;
}

export function SectionLoading({
  message,
  className = "",
}: SectionLoadingProps) {
  return (
    <div className={`py-8 flex items-center justify-center ${className}`}>
      <LoadingSpinner label={message} />
    </div>
  );
}

// Hook for managing loading states
export function useLoading(initialState: boolean = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [loadingMessage, setLoadingMessage] = React.useState<string>("");

  const startLoading = React.useCallback((message?: string) => {
    setIsLoading(true);
    if (message) setLoadingMessage(message);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
    setLoadingMessage("");
  }, []);

  const withLoading = React.useCallback(
    async (asyncFunction: () => Promise<any>, message?: string) => {
      startLoading(message);
      try {
        const result = await asyncFunction();

        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    withLoading,
  };
}
