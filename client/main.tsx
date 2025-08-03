import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

const AppRoot = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <App />
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent duplicate root creation
const container = document.getElementById("root")!;
let root: Root;

// Check if we already have a root attached to avoid duplicate creation
if (!(container as any)._reactRoot) {
  root = createRoot(container);
  (container as any)._reactRoot = root;
} else {
  root = (container as any)._reactRoot;
}

root.render(<AppRoot />);
