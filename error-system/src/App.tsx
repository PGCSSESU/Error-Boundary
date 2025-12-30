import { useState } from "react";
import { Button } from "./components/ui/button";
import { useErrorStore } from "./core/error/errorStore";
import { logError } from "./core/error/errorLogger";
import { motion } from "framer-motion";
import { Plus, AlertCircle, Brain } from "lucide-react";

export default function App() {
  const [count, setCount] = useState(0);
  const [crashUI, setCrashUI] = useState(false);

  const setLastAction = useErrorStore((s) => s.setLastAction);

  if (crashUI) {
    throw new Error("🔥 UI Crash Test");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-green-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-green-200 bg-white p-6 shadow-xl shadow-green-400/20"
      >
     
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-green-400/20" />

        
        <h1 className="text-center text-2xl font-semibold text-green-800">
          Error Handling Playground
        </h1>
        <p className="mt-1 text-center text-sm text-green-700/80">
          Test UI, logic, and recovery flows safely
        </p>

    
        <div className="mt-6 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-900">
          <span className="font-medium">Count</span>
          <span className="text-lg font-semibold">{count}</span>
        </div>


        <div className="mt-6 grid gap-3">
    
          <Button
            variant="outline"
            className="w-full gap-2 border-green-300 bg-white text-green-800 hover:bg-green-50 hover:border-green-400"
            onClick={() => {
              setLastAction(() => () =>
                setCount((prev) => prev + 1)
              );
              setCount((prev) => prev + 1);
            }}
          >
            <Plus className="h-4 w-4" />
            Increment Count
          </Button>

    
          <Button
            variant="outline"
            className="w-full gap-2 border-green-300 bg-white text-green-800 hover:bg-green-50 hover:border-green-400"
            onClick={() => {
              setLastAction(() => () => setCrashUI(true));
              setCrashUI(true);
            }}
          >
            <AlertCircle className="h-4 w-4" />
            Trigger UI Error
          </Button>

    
          <Button
            variant="outline"
            className="w-full gap-2 border-green-300 bg-white text-green-800 hover:bg-green-50 hover:border-green-400"
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
            <Brain className="h-4 w-4" />
            Trigger Logic Error
          </Button>
        </div>

 
        <p className="mt-5 text-center text-xs text-green-700/70">
          Errors are tracked, categorized, and recoverable.
        </p>
      </motion.div>
    </div>
  );
}
