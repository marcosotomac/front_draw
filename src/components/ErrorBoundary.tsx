import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="mb-6">
              <Icon
                icon="lucide:alert-triangle"
                className="text-6xl text-warning mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h1>
              <p className="text-foreground-500 mb-4">
                We&#39;re sorry, but something unexpected happened. Please try
                again.
              </p>
              {this.state.error && (
                <details className="text-left bg-content1 p-4 rounded-lg mb-4">
                  <summary className="cursor-pointer text-sm font-medium text-foreground-600 mb-2">
                    Error Details
                  </summary>
                  <code className="text-xs text-danger-500 break-words">
                    {this.state.error.message}
                  </code>
                </details>
              )}
            </div>
            <div className="space-y-3">
              <Button
                color="primary"
                variant="shadow"
                className="w-full"
                startContent={<Icon icon="lucide:refresh-cw" />}
                onPress={this.handleReset}
              >
                Try Again
              </Button>
              <Button
                color="default"
                variant="bordered"
                className="w-full"
                startContent={<Icon icon="lucide:home" />}
                onPress={this.handleReload}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
