export type ErrorCategory = "UI" | "NETWORK" | "LOGIC";

export interface AppError {
  id: string;
  category: ErrorCategory;
  message: string;
  timestamp: number;
  correlationId: string;
  stack?: string;
}
