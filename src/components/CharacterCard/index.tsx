// CharacterCard.tsx

import React from "react";
import "./characterCard.scss"; // Stil dosyanızı ekleyin
import { format } from "date-fns";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addFavorite, removeFavorite } from "@/lib/redux/slices/FavoriteSlice";

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
  small?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  sort = true,
  small = false,
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
    type,
    id,
  } = character;
  const { favCharacters } = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()

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
    <div className={`character-card ${small ? "small" : ""}`}>
      <div className="image-container">
        <img src={image} alt={name} />
        <div
          className="like-button"
          onClick={() => {
            if (favCharacters.some((f) => f.id === id)) {
              dispatch(removeFavorite(id))
            } else {
              dispatch(addFavorite(character));
            }
          }}
        >
          <FaHeart
            size={36}
            className={`heart-icon ${
              favCharacters.some((f) => f.id === id) ? "liked" : ""
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

        <p>
          <strong>Species:</strong> {species}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        {!sort && (
          <>
            <p>
              <strong>Type:</strong> {type}
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
