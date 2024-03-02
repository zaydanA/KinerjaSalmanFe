import React from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <nav>
            <ul>
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li key={pageNumber + 1}>
                        <button onClick={() => onPageChange(pageNumber + 1)}>
                            {pageNumber + 1}
                        </button>
                    </li>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </ul>
        </nav>
    );
};

export default Pagination