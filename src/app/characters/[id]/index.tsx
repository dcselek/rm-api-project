"use client";
import CharacterCard from "@/components/CharacterCard";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import "./characters.scss";
import FilterButton from "@/components/FilterButton";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";

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
  const [page, setPage] = React.useState<number>(1);
  const [sumCharacters, setSumCharacters] = React.useState<number>(0);

  const getCharacters = useMutation({
    mutationFn: (residents) => axiosInstance.get(`/character/${residents}`),
    onSuccess: ({ data }) => {

      setCharacters(data);
      setSumCharacters(data.length);
      setFilteredCharacters(data.slice(0, 18));
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

  const getCharactersByFilter = (filter: string) => {
    const start = (page - 1) * 18;
      const end = page * 18;
      if(filter !== "all") {
        setSumCharacters(characters.filter((item) => item.status.toLowerCase() === filter).length);
        const filtered = characters.filter((item) => item.status.toLowerCase() === filter);
        setFilteredCharacters(filtered.slice(start, end));
        return;
      }
      setFilteredCharacters(characters.slice(start, end));
  }

  React.useEffect(() => {
    if (characters.length > 0) {
      getCharactersByFilter(filter);
    }
  }, [characters, filter, page]);

  if (getLocation.isPending || getCharacters.isPending) {
    return <Loader />;
  }

  return (
    <div>
      {dataLocation && (
        <div className="data-location-card">
          <h1>{dataLocation.name}</h1>
          <p>{dataLocation.type}</p>
          <p>{dataLocation.dimension}</p>
          <p>{format(new Date(dataLocation.created), "dd.MM.yyyy")}</p>
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
      <div>
        <p>There are {sumCharacters} {filter !== "all" && filter} characters in this location</p>
      </div>
      <div className="characters-list">
        {filteredCharacters?.length > 0 &&
          filteredCharacters?.map((item: CharacterType) => (
            <CharacterCard sort character={item} key={item.id} />
          ))}
          {filteredCharacters?.length === 0 && <p>There is no character</p>}
      </div>
      <Pagination page={page} setPage={setPage} prevDisabled={page === 1} nextDisabled={sumCharacters <= page * 18} />
    </div>
  );
};

export default LocationPage;
