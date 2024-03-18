"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IApiBaseEmployee } from "@/types/employee";
import Search from "@/components/shares/search/Search";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";
import { lib } from "@/lib";
import Filter from "./Filter";
import Pagination from "@/components/shares/pagination/Pagination";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import { useAuth } from "@/contexts";

const EmployeeList = () => {
  const api = apiBase();
  const customLib = lib();
  const router = useRouter();
  // const { user } = useAuth();

  const [currentEmployees, setCurrentEmployees] = useState<IApiBaseEmployee[]>(
    [],
  );
  const [currentDepartments, setCurrentDepartments] = useState<
    IApiBaseDepartment[]
  >([]);
  const [currentPositions, setCurrentPositions] = useState<IApiBasePosition[]>(
    [],
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const selectDepartment = useRef<number[] | undefined>();
  const selectPosition = useRef<number[] | undefined>();
  const selectStatus = useRef<string[] | undefined>();
  const searchValue = useRef<string | undefined>();

  // This only called once when the page rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await api.department().getDepartment();
        const positions = await api.position().getPosition();
        const employees = await api.employee().getEmployee();

        setCurrentEmployees(employees.data.data);
        setTotalPage(employees.data.last_page);
        setCurrentDepartments(departments.data);
        setCurrentPositions(positions.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchList = async ({
    page,
  }: {
    search?: string;
    page: number;
    filterStatus?: string[];
    filterDepartment?: number[];
    filterPosition?: number[];
  }) => {
    const employees = await api
      .employee()
      .getEmployee(
        page,
        10,
        searchValue.current,
        selectStatus.current,
        selectDepartment.current,
        selectPosition.current,
      );

    // return employees;
    setCurrentPage(page);
    setCurrentEmployees(employees.data.data);
    setTotalPage(employees.data.last_page);
  };

  const handleSearch = (s: string) => {
    searchValue.current = s;
    fetchList({ page: 1 });
    // fetchList({ search: s, page: 1 });
  };
  const handleFilterStatus = (s?: string[]) => {
    selectStatus.current = s;
    fetchList({ page: 1 });
    // fetchList({ filterStatus: s, page: 1 });
  };

  const handleFilterDepartment = (d?: string[]) => {
    // setSelectDepartment(d)
    selectDepartment.current =
      d &&
      currentDepartments
        .filter((dept) => d.includes(dept.dept_name))
        .map((dept) => dept.dept_id);

    fetchList({ page: 1 });
    // fetchList({ filterDepartment: deptIds, page: 1 });
  };

  const handleFilterPosition = (p?: string[]) => {
    // setSelectPosition(p)
    selectPosition.current =
      p &&
      currentPositions
        .filter((post) => p.includes(post.title))
        .map((post) => post.position_id);

    fetchList({ page: 1 });
    // fetchList({ filterPosition: posIds, page: 1 });
  };

  const onPageChange = (pageNumber: number) => {
    fetchList({ page: pageNumber });
  };

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

  // const isAuthenticated = isHRDManagerOrDirector() || isManager(); // Udah dihandle di protected route

  return (
    <div className="flex flex-col gap-4 py-10 px-12">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-lg mb-1 text-gray-500">Employee</h2>
            <h1 className="text-2xl font-bold">List of Employees</h1>
          </div>
          <BaseInputButton
            text="Add employee"
            onClick={() => router.push("employee/add")}
          />
        </div>
        <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
          <div className="flex gap-5 max-md:gap-1">
            <Filter
              label="Employment Status"
              filterContent={["Active", "Unactive"]}
              handler={handleFilterStatus}
            />
            <Filter
              label="Department"
              filterContent={currentDepartments.map((d) => {
                return d.dept_name;
              })}
              handler={handleFilterDepartment}
            />
            <Filter
              label="Position"
              filterContent={currentPositions.map((p) => {
                return p.title;
              })}
              handler={handleFilterPosition}
            />
          </div>
          <Search
            placeholder="Search employees.."
            setSearchValue={handleSearch}
          />
        </div>
      </div>
      <div className=" overflow-x-scroll rounded-lg border-1 max-xl:h-5/6">
        <table className=" w-full">
          <TableHeader headers={header} action={true} />
          <tbody>
            {currentEmployees.map((e, index) => {
              const dataContent = [
                "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
                e.full_name,
                e.email,
                currentDepartments.find((d) => d.dept_id == e.dept_id)
                  ?.dept_name,
                currentPositions.find((p) => p.position_id == e.position_id)
                  ?.title,
                e.status == 1 ? "Active" : "Inactive",
                customLib.formatDate(String(e.join_date)),
                e.resign_date
                  ? customLib.formatDate(String(e.resign_date))
                  : "-",
                customLib.formatDate(String(e.date_of_birth)),
                e.phone_number,
                e.gender,
              ];
              return (
                <TableData
                  key={index}
                  dataContent={dataContent}
                  onClickEdit={() => {
                    router.push(`employee/${e.user_id}`);
                  }}
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
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
