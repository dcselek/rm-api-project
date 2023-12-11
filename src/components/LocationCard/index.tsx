import React from "react";
import styles from "./locationCard.module.scss";
import Link from "next/link";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { name, type, dimension, residents, id } = location;
  const residentsCount = residents.length;

  return (
    <div className={styles["location-card"]}>
      <Link className={styles.link} href={`characters/${id}`}>{name}</Link>
      <p>
        <span>Type:</span> {type}
      </p>
      <p>
        <span>Dimension:</span> {dimension}
      </p>
      <p>
        <span>Residents Count:</span> {residentsCount}
      </p>
    </div>
  );
};

export default LocationCard;
