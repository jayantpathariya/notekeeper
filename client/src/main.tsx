import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ModalProvider } from "./providers/modal-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
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
    </ThemeProvider>
  </React.StrictMode>
);
