import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ModalProvider } from "./providers/modal-provider.tsx";
import { AuthProvider } from "./providers/auth-provider.tsx";
import { SidebarProvider } from "./providers/sidebar-provider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SidebarProvider>
              <ModalProvider>
                <App />
                <Toaster
                  toastOptions={{
                    classNames: {
                      toast: "bg-primary-light dark:bg-primary-dark",
                      title: "text-on-primary-light dark:text-on-primary-dark",
                    },
                  }}
                />
              </ModalProvider>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
