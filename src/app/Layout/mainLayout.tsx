"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default MainLayout;
