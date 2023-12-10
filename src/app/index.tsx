"use client";
import LocationCard from "@/components/LocationCard";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./page.module.scss";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

const HomePage = () => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["locations", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/location?page=${page}`);
      return data;
    },
  });

  return (
    <main className={styles.main}>
      <h1>Locations</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p>There was an error</p>}
      {data?.info && <p>There are {data.info.count} locations in the API</p>}
      <section className={styles.locations}>
        {data?.results.map((location: Location) => (
          <LocationCard location={location} key={location.id} />
        ))}
      </section>
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data?.info.next}
        >
          Next Page
        </button>
      </div>
    </main>
  );
};

export default HomePage;
