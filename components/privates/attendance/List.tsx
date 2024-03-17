"use client"

import Pagination from "@/components/shares/pagination/Pagination";
import Search from "@/components/shares/search/Search";
import TableData from "@/components/shares/tables/TableData";
import Filter from "../employees/Filter";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import { useEffect, useRef, useState } from "react";
import { apiBase } from "@/api";
import { lib } from "@/lib";
import { useRouter } from "next/navigation";
import { IApiAttendanceList, IApiAttendancePagination } from "@/types/attendance";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";
import { AttendanceType } from "@/enums/enums";
import TableHeader from "@/components/shares/tables/TableHeader";

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
  const selectAttendanceType = useRef<string[] | undefined>();
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

  const fetchList = async ({
    page,
  }: {
    search?: string;
    page: number;
    filterAttendanceType?: string[];
    filterDepartment?: number[];
    filterPosition?: number[];
  }) => {
    const attendances = await api
      .attendance()
      .getTodayAll(
        page,
        10,
        searchValue.current,
        selectAttendanceType.current,
        selectDepartment.current,
        selectPosition.current,
      );

    setCurrentPage(page);
    setCurrentAttendances(attendances.data.data);
    setTotalPage(attendances.data.last_page);
  };

  const handleSearch = (s: string) => {
    searchValue.current = s;
    fetchList({ page: 1 });
  };
  const handleFilterAttendanceType = (s?: string[]) => {
    selectAttendanceType.current = s;
    fetchList({ page: 1 });
  };

  const handleFilterDepartment = (d?: string[]) => {
    selectDepartment.current =
      d &&
      currentDepartments
        .filter((dept) => d.includes(dept.dept_name))
        .map((dept) => dept.dept_id);

    fetchList({ page: 1 });
  };

  const handleFilterPosition = (p?: string[]) => {
    selectPosition.current =
      p &&
      currentPositions
        .filter((post) => p.includes(post.title))
        .map((post) => post.position_id);

    fetchList({ page: 1 });
  };

  const onPageChange = (pageNumber: number) => {
    fetchList({ page: pageNumber });
  };

  const header = [
    "Employee",
    "Employee Id",
    "Department",
    "Position",
    "Attendance Type",
    "Clock In",
    "Clock Out"
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-lg mb-1 text-gray-500">Attendance</h2>
              <h1 className="text-2xl font-bold">List of Attendances Today</h1>
            </div>
          </div>
          <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
            <div className="flex gap-5 max-md:gap-1">
              <Filter
                label="Attendance Type"
                filterContent={Object.values(AttendanceType)}
                handler={handleFilterAttendanceType}
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
              {currentAttendances.map((e, index) => {
                const dataContent = [
                  "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
                  e.user.full_name,
                  e.user.email,
                  `# ${e.user.employee_id}`,
                  currentDepartments.find((d) => d.dept_id == e.user.dept_id)
                    ?.dept_name,
                  currentPositions.find((p) => p.position_id == e.user.position_id)
                    ?.title,
                  customLib.toLabelCase(e.attendance_type, false),
                  customLib.toHoursMinutes(e.clock_in) ?? '-',
                  customLib.toHoursMinutes(e.clock_out) ?? '-'
                ];
                return (
                  <TableData
                    key={index}
                    dataContent={dataContent}
                    onClickEdit={() => console.log()}
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