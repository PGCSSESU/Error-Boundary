import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { logError } from "./error/errorLogger";
import { createCorrelationId } from "./error/correlation";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      logError({
        id: crypto.randomUUID(),
        category: "NETWORK",
        message: (error as Error).message || "Network error",
        timestamp: Date.now(),
        correlationId: createCorrelationId(),
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      logError({
        id: crypto.randomUUID(),
        category: "NETWORK",
        message: (error as Error).message || "Mutation failed",
        timestamp: Date.now(),
        correlationId: createCorrelationId(),
      });
    },
  }),
});
