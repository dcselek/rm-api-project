// CharacterCard.tsx

import React from "react";
import "./CharacterCard.scss"; // Stil dosyanızı ekleyin
import { format } from "date-fns";
import Link from "next/link";

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
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
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

  // Durum göstergesi için stil sınıfı belirleme fonksiyonu
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
      <div className="">
        <img src={image} alt={name} />
      </div>
      <div className={`character-details ${getStatusIndicatorClass()}`}>
        <Link className="link" href={`/character/${id}`}>
          <h2>{name}</h2>
          <div className="status-indicator"></div>
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
        <p>
          <strong>Origin:</strong> {origin.name}
        </p>
        <p>
          <strong>Last Location:</strong> {location.name}
        </p>
        <p>
          <strong>Created:</strong> {format(new Date(created), "dd/MM/yyyy")} -{" "}
          {episode.length} episodes
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
