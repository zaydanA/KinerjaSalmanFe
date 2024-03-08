import React from "react";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange
}: {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-center">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul className="flex">
        {[...Array(totalPage).keys()].map((pageNumber) => (
          <li key={pageNumber + 1}>
            <button
              className={`ml-1 bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 border border-gray-300 rounded-full ${
                currentPage === pageNumber + 1
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={`ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          currentPage === totalPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
