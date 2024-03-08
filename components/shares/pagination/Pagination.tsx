import React from "react";

const Pagination = ({currentPage, totalPage, onPageChange} : {currentPage: number, totalPage: number, onPageChange: (page: number) => void}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < totalPage) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <nav>
            <ul>
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPage).keys()].map((pageNumber) => (
                    <li key={pageNumber + 1}>
                        <button onClick={() => onPageChange(pageNumber + 1)}>
                            {pageNumber + 1}
                        </button>
                    </li>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPage}>
                    Next
                </button>
            </ul>
        </nav>
    );
};

export default Pagination