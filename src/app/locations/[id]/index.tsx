import React from "react";

interface Location {
  params: {
    id: string;
  };
}

const LocationPage: React.FC<Location> = ({ params }) => {
  return (
    <div>
      LocationPage
      {params.id}
    </div>
  );
};

export default LocationPage;
