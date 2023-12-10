"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RickAndMortyLogo from "@/assets/Rick_and_Morty.png"
import Image from "next/image";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Image src={RickAndMortyLogo} alt="Rick and Morty Logo" className="logo" />
      {children}
    </QueryClientProvider>
  );
};

export default MainLayout;
