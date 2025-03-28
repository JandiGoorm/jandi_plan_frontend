import { useCallback, useEffect, useMemo } from "react";
import styles from "./Pagination.module.css";
import { Button } from "..";

const distance = (a, b) => Math.abs(a - b);

const START_PAGE = 1;

const Pagination = ({ callback, currentPage, totalPage }) => {
  const safetyCurrentPage = useMemo(() => {
    return Math.min(Math.max(currentPage, START_PAGE), totalPage);
  }, [currentPage, totalPage]);

  const handlePrevPage = useCallback(() => {
    callback(Math.max(safetyCurrentPage - 1, 0));
  }, [callback, safetyCurrentPage]);

  const handleNextPage = useCallback(() => {
    callback(Math.min(safetyCurrentPage + 1, totalPage));
  }, [callback, safetyCurrentPage, totalPage]);

  const handlePageChange = useCallback(
    (num) => {
      callback(num);
    },
    [callback]
  );

  const pageRange = useMemo(() => {
    const range = [];
    if (safetyCurrentPage > 2) {
      range.push(safetyCurrentPage - 1);
    }
    if (safetyCurrentPage !== START_PAGE && safetyCurrentPage !== totalPage) {
      range.push(safetyCurrentPage);
    }
    if (safetyCurrentPage < totalPage - 1) {
      range.push(safetyCurrentPage + 1);
    }
    return range;
  }, [safetyCurrentPage, totalPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Button
        variant="ghost"
        onClick={handlePrevPage}
        disabled={safetyCurrentPage === 1}
      >
        이전
      </Button>
      <Button
        variant={safetyCurrentPage === 1 ? "solid" : "ghost"}
        onClick={() => handlePageChange(1)}
        disabled={safetyCurrentPage === 1}
      >
        1
      </Button>
      {distance(safetyCurrentPage, START_PAGE) >= 3 && <span>...</span>}
      {pageRange.map((page) => (
        <Button
          key={page}
          variant={safetyCurrentPage === page ? "solid" : "ghost"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
      {distance(safetyCurrentPage, totalPage) >= 3 && <span>...</span>}
      {totalPage > 1 && (
        <Button
          variant={safetyCurrentPage === totalPage ? "solid" : "ghost"}
          onClick={() => handlePageChange(totalPage)}
          disabled={safetyCurrentPage === totalPage}
        >
          {totalPage}
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={handleNextPage}
        disabled={safetyCurrentPage === totalPage}
      >
        다음
      </Button>
    </div>
  );
};

export default Pagination;
