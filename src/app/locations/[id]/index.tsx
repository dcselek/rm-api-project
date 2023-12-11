"use client";
import CharacterCard from "@/components/CharacterCard";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import "./characters.scss";
import BackButton from "@/components/BackButton";
import FilterButton from "@/components/FilterButton";

interface Location {
  params: {
    id: string;
  };
}

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

const LocationPage: React.FC<Location> = ({ params }) => {
  const [dataLocation, setDataLocation] = React.useState<any>(null);
  const [characters, setCharacters] = React.useState<CharacterType[]>([]);
  const [filter, setFilter] = React.useState<
    "all" | "alive" | "dead" | "unknown"
  >("all");
  const [filteredCharacters, setFilteredCharacters] = React.useState<
    CharacterType[]
  >([]);

  const getCharacters = useMutation({
    mutationFn: (residents) => axiosInstance.get(`/character/${residents}`),
    onSuccess: ({ data }) => {
      setCharacters(data);
      setFilteredCharacters(data);
    },
  });

  const getLocation = useMutation({
    mutationFn: (id: string) => axiosInstance.get(`/location/${id}`),
    onSuccess: ({ data }) => {
      const residents = data.residents.map((item: any) => {
        return item.split("/").pop();
      });
      getCharacters.mutate(residents);
      setDataLocation(data);
    },
  });

  React.useEffect(() => {
    getLocation.mutate(params.id);
  }, []);

  React.useEffect(() => {
    if (characters.length > 0) {
      if (filter === "all") {
        setFilteredCharacters(characters);
      } else {
        const filtered = characters.filter((item) => item.status.toLowerCase() === filter);
        setFilteredCharacters(filtered);
      }
    }
  }, [filter]);

  return (
    <div>
      <BackButton />
      {dataLocation && (
        <div className="data-location-card">
          <h1>{dataLocation.name}</h1>
          <p>{dataLocation.type}</p>
          <p>{dataLocation.dimension}</p>
          <p>{dataLocation.created}</p>
        </div>
      )}
      <div className="filter-buttons">
        <div className="filter-buttons">
          {["all", "alive", "dead", "unknown"].map((item) => (
            <FilterButton
              filter={filter}
              setFilter={() => {
                setFilter(item as "unknown" | "all" | "alive" | "dead");
              }}
              key={item}
            >
              {item}
            </FilterButton>
          ))}
        </div>
      </div>
      <div className="characters-list">
        {filteredCharacters &&
          filteredCharacters.map((item: CharacterType) => (
            <CharacterCard character={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default LocationPage;
