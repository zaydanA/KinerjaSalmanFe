"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useState } from "react";
import { IApiBaseEmployee } from "@/types/employee";
import Search from "@/components/shares/search/Search";

const EmployeeList = () => {
  const [currentEmployees, setCurrentEmployees] = useState<IApiBaseEmployee[]>(
    []
  );

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(searchValue);
        const employees = await apiBase().employee().getEmployee(searchValue);
        console.log(employees.data.data);
        setCurrentEmployees(employees.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchValue]);

  const getSearchValue = (q: string) => {
    console.log(q);
  };

  const header = [
    "Employee",
    "Divisi",
    "Employment Status",
    "Join Date",
    "End Date",
    "Birth Date",
    "Address",
    "Phone",
    "Gender",
    "Marital Status",
  ];

  return (
    <>
      <div className="flex w-full justify-between">
        <p>Filter</p>
        <Search
          placeholder="Search employees.."
          setSearchValue={setSearchValue}
        />
        {/* <p>Search</p> */}
      </div>
      <div className=" border-1 rounded-lg overflow-x-scroll">
        <table className=" w-full">
          <TableHeader headers={header} action={true} />
          <tbody>
            {currentEmployees.map((e, index) => {
              const dataContent = [
                "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
                e.full_name,
                e.email,
                e.dept.dept_name,
                "Active" ,
                String(e.join_date),
                String(e.resign_date),
                String(e.date_of_birth),
                "Kavling AL",
                e.phone_number,
                e.gender,
                "Married",
              ];
              return (
                <TableData
                  key={index}
                  dataContent={dataContent}
                  onClickAction={() => console.log()}
                  isProfile={true}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
