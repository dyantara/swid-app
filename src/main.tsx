import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-context";
import { FontProvider } from "./context/font-context";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// bikin instance client react-query
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <FontProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                    <Toaster richColors position="top-right" />
                </QueryClientProvider>
            </FontProvider>
        </ThemeProvider>
    </StrictMode>
);
