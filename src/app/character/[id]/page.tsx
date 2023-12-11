import React from "react";
import CharacterPage from ".";

interface Props {
  params: {
    id: string;
  };
}

const page: React.FC<Props> = ({ params }) => {
  return <CharacterPage params={params} />;
};

export default page;
