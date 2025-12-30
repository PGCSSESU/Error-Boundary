import { Button } from "./ui/button";
import type { FallbackProps } from "react-error-boundary";
import { useErrorStore } from "../core/error/errorStore";
import { AlertTriangle, RefreshCcw, Bug } from "lucide-react";
import { motion } from "framer-motion";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errors = useErrorStore((s) => s.errors);
  const lastError = errors[errors.length - 1];
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-green-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-green-200 bg-white p-6 shadow-xl shadow-green-400/20"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-green-400/20" />


        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 shadow-inner">
          <AlertTriangle className="h-6 w-6" />
        </div>


        <h2 className="text-center text-xl font-semibold text-green-800">
          Something went wrong
        </h2>


        <p className="mt-1 text-center text-sm text-green-700/80">
          No worries — this didn't break anything. You can retry safely.
        </p>


        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900 space-y-1">
          <p>
            <span className="font-medium">Message:</span>{" "}
            {lastError?.message ?? error.message}
          </p>

          <p>
            <span className="font-medium">Category:</span>{" "}
            {lastError?.category ?? "UI"}
          </p>
        </div>

        {isDev && error.stack && (
          <details className="mt-4 rounded-lg border border-green-200 bg-white p-3 text-xs text-green-900">
            <summary className="flex cursor-pointer items-center gap-2 font-medium text-green-800">
              <Bug className="h-4 w-4" />
             Details
            </summary>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-md bg-green-50 p-2 text-[11px] leading-relaxed">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={resetErrorBoundary}
            className="w-full gap-2 bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-400"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>

          <p className="text-center text-xs text-green-700/70">
            If the issue continues, please contact support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
