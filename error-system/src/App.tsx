import { useState } from "react";
import { Button } from "./components/ui/button";
import { useErrorStore } from "./core/error/errorStore";
import { logError } from "./core/error/errorLogger";

export default function App() {
  const [count, setCount] = useState(0);
  const [crashUI, setCrashUI] = useState(false);

  const setLastAction = useErrorStore((s) => s.setLastAction);

  if (crashUI) {
    throw new Error("🔥 UI Crash Test");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">
          Error Handling Playground
        </h1>

        <div className="flex justify-between">
          <span>Count</span>
          <span>{count}</span>
        </div>

        <Button
          onClick={() => {
            setLastAction(() => () =>
              setCount((prev) => prev + 1)
            );
            setCount((prev) => prev + 1);
          }}
        >
          Increment Count
        </Button>

        <Button
          variant="destructive"
          onClick={() => {
            setLastAction(() => () => setCrashUI(true));
            setCrashUI(true);
          }}
        >
          Trigger UI Error
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            logError({
              id: crypto.randomUUID(),
              category: "LOGIC",
              message: "🧠 Logic Error Test",
              timestamp: Date.now(),
              correlationId: crypto.randomUUID(),
            });
          }}
        >
          Trigger Logic Error
        </Button>
      </div>
    </div>
  );
}
