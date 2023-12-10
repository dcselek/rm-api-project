import React from "react";
import LocationPage from ".";

interface Location {
  params: {
    id: string;
  };
}

const page:React.FC<Location> = ({ params }) => {
  return <LocationPage params={params} />;
};

export default page;
