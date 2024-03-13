import React from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}) => {
  const handleStart = () => {
    if (currentPage > 1) {
      onPageChange(1)
    }
  }
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

  const handleEnd = () => {
    if (currentPage < totalPage) {
      onPageChange(totalPage)
    }
  }

  return (
    <nav className="flex items-center justify-center gap-3">
      <div className="flex gap-1">
        <button
          className={` rounded-full bg-clr-kinerja-gold px-2 py-2 font-bold text-white hover:bg-clr-kinerja-gold-hover ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleStart}
          disabled={currentPage === 1}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button
          className={` rounded-full bg-clr-kinerja-gold px-2 py-2 font-bold text-white hover:bg-clr-kinerja-gold-hover ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft />
        </button>
      </div>
      <div>
        {currentPage}
      </div>
      {/* <ul className="flex">
        {[...Array(totalPage).keys()].map((pageNumber) => (
          <li key={pageNumber + 1}>
            <button
              className={`ml-1 bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 border border-gray-300 rounded-full ${
                currentPage === pageNumber + 1
                  ? " text-black"
                  : ""
              }`}
              onClick={() => onPageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul> */}
      <div className="flex gap-1">
        <button
          className={` rounded-full bg-clr-kinerja-gold px-2 py-2 font-bold text-white hover:bg-clr-kinerja-gold-hover ${
            currentPage === totalPage ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPage}
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          className={` rounded-full bg-clr-kinerja-gold px-2 py-2 font-bold text-white hover:bg-clr-kinerja-gold-hover ${
            currentPage === totalPage ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleEnd}
          disabled={currentPage === totalPage}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
