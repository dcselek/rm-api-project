"use client";
import CharacterCard from "@/components/CharacterCard";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import "./characters.scss"

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

  const getCharacters = useMutation({
    mutationFn: (residents) => axiosInstance.get(`/character/${residents}`),
    onSuccess: ({ data }) => {
      setCharacters(data);
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

  return (
    <div>
      {dataLocation && (
        <div>
          <h1>{dataLocation.name}</h1>
          <p>{dataLocation.type}</p>
          <p>{dataLocation.dimension}</p>
          <p>{dataLocation.created}</p>
        </div>
      )}
      <div className="characters-list">
      {characters &&
        characters.map((item: CharacterType) => (
          <CharacterCard character={item} key={item.id} />
        ))}
        </div>
    </div>
  );
};

export default LocationPage;
