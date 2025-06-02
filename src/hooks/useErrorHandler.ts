import { useState, useCallback } from "react";
import { addToast } from "@heroui/react";

interface UseErrorHandlerReturn {
  error: string | null;
  isError: boolean;
  handleError: (error: Error | string) => void;
  clearError: () => void;
  showErrorToast: (error: Error | string, title?: string) => void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: Error | string) => {
    const errorMessage = error instanceof Error ? error.message : error;
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const showErrorToast = useCallback(
    (error: Error | string, title: string = "Error") => {
      const errorMessage = error instanceof Error ? error.message : error;

      addToast({
        title,
        description: errorMessage,
        color: "danger",
      });
    },
    []
  );

  return {
    error,
    isError: error !== null,
    handleError,
    clearError,
    showErrorToast,
  };
}

// Global error types for better error handling
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export class ApiError extends Error implements AppError {
  public statusCode: number;
  public code: string;
  public context?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "API_ERROR",
    context?: Record<string, any>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.context = context;
  }
}

export class ValidationError extends Error implements AppError {
  public code: string = "VALIDATION_ERROR";
  public context?: Record<string, any>;

  constructor(message: string, context?: Record<string, any>) {
    super(message);
    this.name = "ValidationError";
    this.context = context;
  }
}

export class AuthError extends Error implements AppError {
  public code: string = "AUTH_ERROR";
  public statusCode: number = 401;

  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthError";
  }
}
