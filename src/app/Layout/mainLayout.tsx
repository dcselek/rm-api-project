"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RickAndMortyLogo from "@/assets/Rick_and_Morty.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BackButton from "@/components/BackButton";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import StoreProvider from "@/app/StoreProvider";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setFavorites } from "@/lib/redux/slices/FavoriteSlice";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      dispatch(setFavorites(JSON.parse(storedFavorites)))
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default MainLayout;
