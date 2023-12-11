"use client";
import CharacterCard from "@/components/CharacterCard";
import { useFavorites } from "@/lib/providers/FavoritesContext";
import React from "react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 && <p>No favorites yet</p>}
      <div className="characters-list">
        {favorites?.map((item) => (
          <CharacterCard sort={false} character={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
