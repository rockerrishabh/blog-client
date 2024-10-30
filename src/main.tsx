import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostProvider } from "./providers/PostProvider";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <UserProvider>
          <PostProvider>
            <RouterProvider router={router} />
          </PostProvider>
        </UserProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
