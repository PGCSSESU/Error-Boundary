import { Button } from "./ui/button";
import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-xl border p-6 shadow-md text-center space-y-4">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. You can try again.
        </p>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  );
}
