import { toast } from "sonner";
import { useErrorStore } from "./errorStore";
import type { AppError } from "./errorTypes";

export function logError(error: AppError) {
  // 🔥 Capture stack if missing (LOGIC errors)
  const enrichedError: AppError = {
    ...error,
    stack: error.stack ?? new Error(error.message).stack,
  };

  // 👨‍💻 Developer console
  console.error("[APP ERROR]", enrichedError);

  // 🗂️ Store FULL error (with stack)
  useErrorStore.getState().logError(enrichedError);

  // 🔔 User notification
  toast.error(enrichedError.message, {
    description: `Ref: ${enrichedError.stack}`,
  });
}
