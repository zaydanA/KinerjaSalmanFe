"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useMemo, useState } from "react";
import { IApiBaseEmployee } from "@/types/employee";
import Search from "@/components/shares/search/Search";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";
import { lib } from "@/lib";
import Filter from "./Filter";
import Pagination from "@/components/shares/pagination/Pagination";
import { useRouter } from "next/navigation";

const EmployeeList = () => {
  const api = apiBase()
  const customLib = lib();
  const router = useRouter();

  const [currentEmployees, setCurrentEmployees] = useState<IApiBaseEmployee[]>(
    []
  );
  const [currentDepartments, setCurrentDepartments] = useState<IApiBaseDepartment[]>([])
  const [currentPositions, setCurrentPositions] = useState<IApiBasePosition[]>([])

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [selectDepartment, setSelectDepartment] = useState<string[] | undefined>()
  const [selectPosition, setSelectPosition] = useState<string[] | undefined>()
  const [selectStatus, setSelectStatus] = useState<string[] | undefined>()

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectDepartment)
        console.log(selectPosition)
        console.log(selectStatus)
        
        const employees = await api.employee().getEmployee(currentPage, 10);
        const departments = await api.department().getDepartment();
        const positions = await api.position().getPosition();

        setCurrentEmployees(employees.data.data);
        setCurrentDepartments(departments.data);
        setCurrentPositions(positions.data);
        setTotalPage(employees.data.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo( async () => {
    const deptIds = selectDepartment && currentDepartments.filter(d => selectDepartment.includes(d.dept_name)).map(d => d.dept_id)
    const posIds = selectPosition && currentPositions.filter(p => selectPosition.includes(p.title)).map(p => p.position_id)

    try {
      const employees = await api.employee().getEmployee(currentPage, 10 ,searchValue, selectStatus, deptIds, posIds);
      setCurrentEmployees(employees.data.data);
      setTotalPage(employees.data.total);
    } catch (error) {
      console.error(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectDepartment, selectPosition, selectStatus, currentPage])

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const handleDelete = async (id: string) => {
    try {
      await api.user().deleteUser(parseInt(id))
      setCurrentEmployees(prevEmployee => prevEmployee.filter(employee => employee.employee_id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const header = [
    "Employee",
    "Department",
    "Position",
    "Employment Status",
    "Join Date",
    "Resign Date",
    "Birth Date",
    "Phone",
    "Gender",
  ];

  return (
    <>
      <div className="flex justify-between">
        <h1 className=" text-xl font-bold">Employees</h1>
        <button onClick={() => router.push('employee/add')} >Add Employee</button>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-5">
        <Filter label="Employment Status" filterContent={["Active", "Unactive"]} handler={setSelectStatus}/>
        <Filter label="Department" filterContent={currentDepartments.map((d) => {return d.dept_name})} handler={setSelectDepartment}/>
        <Filter label="Position" filterContent={currentPositions.map((p) => {return p.title})} handler={setSelectPosition}/>
        </div>
        <Search
          placeholder="Search employees.."
          setSearchValue={setSearchValue}
        />
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
                currentDepartments.find((d) => d.dept_id == e.dept_id)?.dept_name,
                currentPositions.find((p) => p.position_id == e.position_id)?.title,
                e.status == 1 ? "Active" : "Inactive",
                customLib.formatDate(String(e.join_date)),
                e.resign_date ? customLib.formatDate(String(e.resign_date)) : "-",
                customLib.formatDate(String(e.date_of_birth)),
                e.phone_number,
                e.gender,
              ];
              return (
                <TableData
                  key={index}
                  dataContent={dataContent}
                  onClickEdit={() => router.push('employee/' + e.user_id)}
                  onClickDelete={() => handleDelete('3')}
                  isProfile={true}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination 
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={onPageChange} />
      </div>
    </>
  );
};

export default EmployeeList;
