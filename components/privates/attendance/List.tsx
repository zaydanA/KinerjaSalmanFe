"use client"

import Pagination from "@/components/shares/pagination/Pagination";
import Search from "@/components/shares/search/Search";
import TableData from "@/components/shares/tables/TableData";
import Filter from "../employees/Filter";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import { useEffect, useRef, useState } from "react";
import { apiBase } from "@/api";
import { lib } from "@/lib";
import { useRouter } from "next/router";
import { IApiAttendanceList, IApiAttendancePagination } from "@/types/attendance";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";

const ListAttendance = () => {
  const api = apiBase();
  const customLib = lib();
  const router = useRouter();
  // const { user } = useAuth();

  const [currentAttendances, setCurrentAttendances] = useState<IApiAttendanceList[]>([]);
  const [currentDepartments, setCurrentDepartments] = useState<IApiBaseDepartment[]>([]);
  const [currentPositions, setCurrentPositions] = useState<IApiBasePosition[]>([]);

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
        const attendances = await api.attendance().getTodayAll();

        setCurrentAttendances(attendances.data.data);
        setTotalPage(attendances.data.last_page);
        setCurrentDepartments(departments.data);
        setCurrentPositions(positions.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className=" text-2xl font-bold">Employees</h1>
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
    </>
  )
}

export default ListAttendance