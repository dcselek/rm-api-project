"use client";
import CharacterCard from "@/components/CharacterCard";
import { useAppSelector } from "@/lib/hooks/redux";
import React from "react";

const FavoritesPage = () => {
  const { favCharacters } = useAppSelector((state) => state.favorites);
  return (
    <div>
      <h1>Favorites</h1>
      {favCharacters.length === 0 && <p>No favorites yet</p>}
      <div className="characters-list">
        {favCharacters?.map((item) => (
          <CharacterCard sort={false} character={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
