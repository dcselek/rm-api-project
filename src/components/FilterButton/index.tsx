import React from "react";
import "./filterButton.scss";

interface FilterButtonProps {
  filter: string;
  setFilter: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filter,
  setFilter,
  children,
}) => {
  return (
    <button
      className={`filter-button ${filter === children ? "active" : ""} ${children}`}
      onClick={() => setFilter()}
    >
      {children}
    </button>
  )
};

export default FilterButton;
