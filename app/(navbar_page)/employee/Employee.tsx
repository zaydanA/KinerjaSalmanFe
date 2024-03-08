"use client"
import React, { useState } from "react";
import Pagination from "@/components/shares/pagination/Pagination";

const Employee = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const dummyData = [
        { id: 1, name: 'Employee 1' },
        { id: 2, name: 'Employee 2' },
        { id: 3, name: 'Employee 3' },
        { id: 4, name: 'Employee 4' },
        { id: 5, name: 'Employee 5' },
        { id: 6, name: 'Employee 6' },
        { id: 7, name: 'Employee 7' },
        { id: 8, name: 'Employee 8' },
        { id: 9, name: 'Employee 9' },
        { id: 10, name: 'Employee 10' },
        { id: 11, name: 'Employee 11' },
        { id: 12, name: 'Employee 12' },
        { id: 13, name: 'Employee 13' },
        { id: 14, name: 'Employee 14' },
        { id: 15, name: 'Employee 15' },
        { id: 16, name: 'Employee 16' },
        { id: 17, name: 'Employee 17' },
        { id: 18, name: 'Employee 18' },
        { id: 19, name: 'Employee 19' },
        { id: 20, name: 'Employee 20' },
    ];

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <ul>
                {currentItems.map((item) => (
                    <li>
                     {item.name}
                    </li>
                ))}
            </ul>
            <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}>
            </Pagination>
        </div>
    )
}

export default Employee;