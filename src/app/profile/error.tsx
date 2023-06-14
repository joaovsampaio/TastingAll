"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/button";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950">
      <div className="flex flex-col justify-center items-center rounded-lg overflow-hidden">
        <div className="flex justify-center bg-slate-900 p-5 w-full">
          <AlertTriangle className="text-red-500" size={100} />
        </div>
        <div className="flex flex-col justify-center bg-slate-800 p-10 gap-4">
          <h2 className="text-red-600 text-4xl font-bold">Algo deu errado!</h2>
          <Button variant="destructive" onClick={() => reset()}>
            Tente Novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
