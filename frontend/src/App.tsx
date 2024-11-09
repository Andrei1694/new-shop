import React from "react";
import { router } from "./pages/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

// Create the router instance

export default function App() {
  return (
    <>
      {" "}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
