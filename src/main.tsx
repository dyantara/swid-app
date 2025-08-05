import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-context";
import { FontProvider } from "./context/font-context";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <FontProvider>
                <App />
                <Toaster richColors position="top-right" />
            </FontProvider>
        </ThemeProvider>
    </StrictMode>
);
