"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RickAndMortyLogo from "@/assets/Rick_and_Morty.png";
import Image from "next/image";
import { FavoritesProvider } from "@/lib/providers/FavoritesContext";
import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Image
          src={RickAndMortyLogo}
          alt="Rick and Morty Logo"
          className="logo"
        />
        {pathname !== "/" && <BackButton />}
        {children}
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
