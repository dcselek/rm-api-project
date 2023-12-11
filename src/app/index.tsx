"use client";
import LocationCard from "@/components/LocationCard";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./page.module.scss";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

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

      {isLoading && <Loader />}
      {isError && <p>There was an error</p>}
      {data?.info && <p>There are {data.info.count} locations in the API</p>}
      <section className={styles.locations}>
        {data?.results.map((location: Location) => (
          <LocationCard location={location} key={location.id} />
        ))}
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        prevDisabled={page === 1}
        nextDisabled={!data?.info.next}
      />
    </main>
  );
};

export default HomePage;
