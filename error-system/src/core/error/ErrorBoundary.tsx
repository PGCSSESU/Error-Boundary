import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../../components/ErrorFallback";
import { logError } from "./errorLogger";
import { createCorrelationId } from "./correlation";
import { useErrorStore } from "./errorStore";
import type { AppError } from "./errorTypes";

export function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lastAction } = useErrorStore();

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        const appError: AppError = {
          id: crypto.randomUUID(),
          category: "UI",
          message: error.message || "UI crash",
          stack: error.stack,
          timestamp: Date.now(),
          correlationId: createCorrelationId(),
        };

        logError(appError);
      }}
      onReset={() => {
        if (lastAction) {
          try {
            lastAction();
          } catch {
            
          }
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
