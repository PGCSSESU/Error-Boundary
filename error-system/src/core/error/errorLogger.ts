import { toast } from "sonner";
import { useErrorStore } from "./errorStore";
import type { AppError } from "./errorTypes";

export function logError(error: AppError) {

  console.error("[APP ERROR]", error);

  useErrorStore.getState().logError(error);

  toast.error(error.message, {
    description: `Ref: ${error.correlationId}`,
  });
}
