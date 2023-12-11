"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RickAndMortyLogo from "@/assets/Rick_and_Morty.png";
import Image from "next/image";
import { FavoritesProvider } from "@/lib/providers/FavoritesContext";
import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

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
          onClick={() => (window.location.href = "/")}
          src={RickAndMortyLogo}
          alt="Rick and Morty Logo"
          className="logo"
        />
        <div className="buttons-container">
          {pathname !== "/" && <BackButton />}
          <Link href="/favorites">
            <FaHeart
              title="Go to Favorites"
              size={32}
              className="favorite-button"
            />
          </Link>
        </div>
        {children}
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
