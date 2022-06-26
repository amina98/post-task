import React, { useState } from "react";
import { DOTS, usePagination } from "../hooks/usePagination";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;
  const [activePage, setActivePage] = useState(currentPage);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
    setActivePage(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    setActivePage(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles.paginationContntainer}>
      <li className={styles.paginationItem} style={{ margin: "0 10px" }}>
        <div
          className={currentPage !== 1 ? styles.arrowLeft : styles.disable}
          onClick={currentPage !== 1 ? onPrevious : undefined}
        >
          Prev
        </div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={styles.paginationItem}>
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={index}
            className={
              activePage == pageNumber
                ? styles.paginationActiveItem
                : styles.paginationItem
            }
            onClick={() => {
              onPageChange(pageNumber);
              setActivePage(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={styles.paginationItem} style={{ margin: "0 10px" }}>
        <div
          className={
            currentPage !== lastPage ? styles.arrowRight : styles.disable
          }
          onClick={currentPage !== lastPage ? onNext : undefined}
        >
          Next
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
