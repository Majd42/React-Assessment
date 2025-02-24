import React from "react";

type PropTypes = {
  numberOfPages: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  numberOfPages,
  activePage,
  setActivePage,
}: PropTypes) => {
  const visiblePages = 3; // Number of pages to show before and after active page
  let pages = [];

  // Always include the first page
  pages.push(1);

  // Determine the range of pages to show
  let start = Math.max(2, activePage - visiblePages);
  let end = Math.min(numberOfPages - 1, activePage + visiblePages);

  if (start > 2) {
    pages.push("..."); // Ellipsis before the range
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < numberOfPages - 1) {
    pages.push("..."); // Ellipsis after the range
  }

  // Always include the last page
  if (numberOfPages > 1) {
    pages.push(numberOfPages);
  }

  return (
    <div className="flex justify-center items-center my-10 gap-2">
      {pages.map((page, index) => (
        <div key={index} className="">
          {page === "..." ? (
            <span className="px-2">...</span>
          ) : (
            <button
              className={
                (activePage === page
                  ? "font-bold -translate-y-1"
                  : "font-normal") + " transition-all duration-300"
              }
              onClick={() => setActivePage(page as number)}
            >
              {page}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
