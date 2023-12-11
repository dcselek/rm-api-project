// CharacterCard.tsx

import React from "react";
import "./characterCard.scss"; // Stil dosyanızı ekleyin
import { format } from "date-fns";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { useFavorites } from "@/lib/providers/FavoritesContext";

interface CharacterType {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterCardProps {
  character: CharacterType;
  sort: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  sort = true,
}) => {
  const {
    status,
    name,
    image,
    species,
    gender,
    origin,
    location,
    episode,
    created,
    id,
  } = character;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const getStatusIndicatorClass = () => {
    switch (status) {
      case "Alive":
        return "alive";
      case "Dead":
        return "dead";
      default:
        return "unknown";
    }
  };

  return (
    <div className={`character-card`}>
      <div className="image-container">
        <img src={image} alt={name} />
        <div
          className="like-button"
          onClick={() => {
            if (favorites.some((f) => f.id === id)) {
              removeFavorite(id);
            } else {
              addFavorite(character);
            }
          }}
        >
          <FaRegHeart
            size={36}
            className={`heart-icon ${
              favorites.some((f) => f.id === id) ? "liked" : ""
            }`}
          />
        </div>
      </div>
      <div className={`character-details ${getStatusIndicatorClass()}`}>
        <div className="status-indicator"></div>
        <Link className="link" href={`/character/${id}`}>
          <h2>{name}</h2>
        </Link>
        <p className="status-text">
          <strong>Status:</strong> {status}
        </p>
        {!sort && (
          <>
            <p>
              <strong>Species:</strong> {species}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Origin:</strong> {origin.name}
            </p>
            <p>
              <strong>Last Location:</strong> {location.name}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {format(new Date(created), "dd/MM/yyyy")} - {episode.length}{" "}
              episodes
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
