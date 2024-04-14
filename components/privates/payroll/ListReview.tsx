"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useRef, useState } from "react";
import { IApiBaseEmployee } from "@/types/employee";
import Search from "@/components/shares/search/Search";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";
import { lib } from "@/lib";
import Pagination from "@/components/shares/pagination/Pagination";
import { usePathname, useRouter } from "next/navigation";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import Filter from "@/components/shares/filters/Filter";
import { IApiBaseEmployeesReviewPayrollItemList } from "@/types/payroll.item";

const statusEnums = [
  "Not Paid",
  "Paid"
]

const ListReviewPayroll = () => {
  const api = apiBase();
  const customLib = lib();
  const router = useRouter();
  const pathname = usePathname().split("/");

  const [payrollReviewData, setPayrollReviewData] = useState<IApiBaseEmployeesReviewPayrollItemList[]>([]);
  const [currentDepartments, setCurrentDepartments] = useState<IApiBaseDepartment[]>([]);
  const [currentPositions, setCurrentPositions] = useState<IApiBasePosition[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const selectDepartment = useRef<number[] | undefined>();
  const selectPosition = useRef<number[] | undefined>();
  const selectStatus = useRef<number[] | undefined>();
  const searchValue = useRef<string | undefined>();

  // This only called once when the page rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await api.department().getDepartment();
        const positions = await api.position().getPosition();
        const payrollReviewData = await api.payrollItem().getEmployeesReviewPayrollItems(
          pathname[2]
        );

        setPayrollReviewData(payrollReviewData.data.data);
        setTotalPage(payrollReviewData.data.last_page);
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
    filterStatus?: number[];
    filterDepartment?: number[];
    filterPosition?: number[];
  }) => {
    const payrollReviewData = await api.payrollItem().getEmployeesReviewPayrollItems(
      pathname[2],
      page,
      10,
      searchValue.current,
      selectStatus.current,
      selectDepartment.current,
      selectPosition.current,
    );

    // return employees;
    setCurrentPage(page);
    setPayrollReviewData(payrollReviewData.data.data);
    setTotalPage(payrollReviewData.data.last_page);
  };

  const handleSearch = (s: string) => {
    searchValue.current = s;
    fetchList({ page: 1 });
  };
  const handleFilterStatus = (s?: string[]) => {
    const numbers = s?.map(Number);
    selectStatus.current = numbers;
    fetchList({ page: 1 });
  };

  const handleFilterDepartment = (d?: string[]) => {
    const numbers = d?.map(Number);
    selectDepartment.current = numbers;
    fetchList({ page: 1 });
  };

  const handleFilterPosition = (p?: string[]) => {
    const numbers = p?.map(Number);
    selectPosition.current = numbers;
    fetchList({ page: 1 });
  };

  const onPageChange = (pageNumber: number) => {
    fetchList({ page: pageNumber });
  };

  const header = [
    "Employee",
    "Department",
    "Position",
    "Payroll Status",
    "Net Salary"
  ];

  return (
    <div className="flex flex-col gap-4 py-10 px-12">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-lg mb-1 text-gray-500">Payroll Review</h2>
            <h1 className="text-2xl font-bold">{customLib.formatYearMonthDate(pathname[2])}</h1>
          </div>
        </div>
        <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
          <div className="flex gap-5 max-md:gap-1">
            <Filter
              label="Employment Status"
              filterContent={["Not Paid", "Paid"].map((val, index) => ({
                label: val,
                value: index
              }))}
              handler={handleFilterStatus}
            />
            <Filter
              label="Department"
              filterContent={currentDepartments.map((d) => ({
                label: d.dept_name,
                value: d.dept_id
              }))}
              handler={handleFilterDepartment}
            />
            <Filter
              label="Position"
              filterContent={currentPositions.map((p) => ({
                label: p.title,
                value: p.position_id
              }))}
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
            {payrollReviewData.map((e, index) => {
              const dataContent = [
                "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
                e.payroll.user.full_name,
                e.payroll.user.email,
                currentDepartments.find((d) => d.dept_id == e.payroll.user.dept_id)
                  ?.dept_name,
                currentPositions.find((p) => p.position_id == e.payroll.user.position_id)
                  ?.title,
                statusEnums[e.status],
                customLib.formatCurrency(e.net_salary),
              ];
              return (
                <TableData
                  key={index}
                  dataContent={dataContent}
                  // onClickEdit={() => {
                  //   window.open(`employee/${e.user_id}`, '_blank');
                  // }}
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

export default ListReviewPayroll;
