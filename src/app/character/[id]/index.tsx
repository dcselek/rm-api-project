"use client";
import CharacterCard from "@/components/CharacterCard";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "./character.scss";

interface Props {
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

const CharacterPage: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const [characterData, setCharacterData] = React.useState<CharacterType>();
  const [characters, setCharacters] = React.useState<CharacterType[]>([]);

  const getCharacter = useMutation({
    mutationFn: (id: string) => axiosInstance.get(`/character/${id}`),
    onSuccess: ({ data }) => {
      setCharacterData(data);
      getLocation.mutate(data.location.url.split("/").pop());
    },
  });

  const getLocation = useMutation({
    mutationFn: (id: string) => axiosInstance.get(`/location/${id}`),
    onSuccess: ({ data }) => {
      const residents = data.residents.map((item: any) => {
        return item.split("/").pop();
      });
      getCharacters.mutate(residents);
    },
  });

  const getCharacters = useMutation({
    mutationFn: (residents) => axiosInstance.get(`/character/${residents}`),
    onSuccess: ({ data }) => {
        const sameStatusDatas = data.filter((item: any) => item.status === characterData?.status);
      setCharacters(sameStatusDatas);
    },
  });

  React.useEffect(() => {
    getCharacter.mutate(id);
  }, [id]);
  return (
    <>
      <div className="container">
        {(getCharacter.isPending ||
          getLocation.isPending ||
          getCharacters.isPending) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "black",
                marginRight: 16,
              }}
            >
              Loading...
            </span>
          </div>
        )}
        {(!getCharacter.isPending &&
          !getLocation.isPending &&
          !getCharacters.isPending) && characterData && (
          <div className="character-container">
            <CharacterCard character={characterData} sort={false} />
          </div>
        )}
        <div>
          {characters?.length > 0 && (
            <>
              <h2>Same Status&Location Characters</h2>
              <div className="residents-container">
                <div className="residents">
                  {characters.map((item) => (
                    <CharacterCard small sort key={item.id} character={item} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
