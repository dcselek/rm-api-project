import React from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  prevDisabled,
  nextDisabled,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={prevDisabled}
      >
        Previous Page
      </button>
      <span>{page}</span>
      <button onClick={() => setPage((old) => old + 1)} disabled={nextDisabled}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
