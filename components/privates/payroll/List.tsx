"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useRef, useState } from "react";
import { lib } from "@/lib";
import Pagination from "@/components/shares/pagination/Pagination";
import { Spinner } from "@nextui-org/react";
import { IApiBasePayrollItemList } from "@/types/payroll.item";
import { useAuth } from "@/contexts";
import FilterRadio from "@/components/shares/filters/FilterRadio";

const statusEnums = [
  "Paid",
  "Not Paid"
]

const ListPayroll = () => {
  const [payrollData, setPayrollData] = useState<IApiBasePayrollItemList[]>([]);
  const customLib = lib();
  const { user, isHRDManagerOrDirector, isManager } = useAuth();
  const userId = user?.user_id;
  const [userPayrollYears, setUserPayrollYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Years
        if (userId) {
          const res_year = await apiBase().payrollItem().getUserPayrollItemsYear(
            userId
          );

          if (res_year.status === 'success') {
            setUserPayrollYears(res_year.data);
          }

          // My payrolls
          const res = await apiBase().payrollItem().getUserPayrollItems(
            userId
          );

          if (res.status === 'success') {
            setPayrollData(res.data.data);
            setTotalPage(res.data.last_page);
            setCurrentPage(res.data.current_page);

            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const selectYear = useRef<number | undefined>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchList = async ({
    page,
  }: {
    page: number;
  }) => {
    if (userId) {
      const payrolls = await apiBase()
        .payrollItem()
        .getUserPayrollItems(
          userId,
          page,
          10,
          selectYear.current,
        );

      setCurrentPage(page);
      setPayrollData(payrolls.data.data);
      setTotalPage(payrolls.data.last_page);
    }
  };

  const handleFilterYear = (y?: number) => {
    selectYear.current = y;
    fetchList({ page: 1 });
  };

  const onPageChange = (pageNumber: number) => {
    fetchList({ page: pageNumber });
  };

  const header = [
    "Year",
    "Month",
    "Status",
    "Net Salary"
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return(
      <>
        {!isLoading ?
        <div>
          <div className='max-h-5/6 overflow-y-auto'>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
                  <div className="flex gap-5 max-md:gap-1 h-8">
                    <FilterRadio
                      label="Year"
                      filterContent={userPayrollYears.map((year, index) => ({
                        label: String(year),
                        value: year
                      }))}
                      handler={handleFilterYear}
                    />
                  </div>
                </div>
              </div>
              <div className=" overflow-x-scroll rounded-lg border-1 max-xl:h-5/6">
                <table className=" w-full">
                  <TableHeader headers={header} action={true} />
                  <tbody>
                    {payrollData.map((e, index) => {
                      const dataContent = [
                        customLib.getYearAndMonthDate(e.date).year,
                        customLib.getYearAndMonthDate(e.date).month,
                        statusEnums[e.status],
                        customLib.formatCurrency(e.net_salary)
                      ];

                      // if (!isHRDManagerOrDirector() && !isManager()) {
                        return (
                          <TableData
                            key={index}
                            dataContent={dataContent}
                            isProfile={false}
                          />
                        );
                      // }
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
          </div>
        </div> : 
        <div className='flex w-full h-[50%] justify-center items-center'>
          <Spinner color="default" size="lg"/>
        </div>}
      </>
  );
};

export default ListPayroll;
