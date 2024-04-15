"use client";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { apiBase } from "@/api";
import React, { useEffect, useRef, useState } from "react";
import { lib } from "@/lib";
import Pagination from "@/components/shares/pagination/Pagination";
import { Spinner } from "@nextui-org/react";
import { IApiBaseEmployeesPayrollItemList, IApiBasePayrollItemList } from "@/types/payroll.item";
import { useAuth } from "@/contexts";
import FilterRadio from "@/components/shares/filters/FilterRadio";
import Filter from "@/components/shares/filters/Filter";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import { useRouter } from "next/navigation";
import BaseModal from "@/components/shares/modals/BaseModal";
import { IApiBaseError } from "@/types/http";
import BaseInputDate from "@/components/shares/inputs/BaseInputDate";
import { useInput } from "@/hooks/useInput";
import { toast } from "react-toastify";

const ListPayroll = () => {
  const [payrollData, setPayrollData] = useState<IApiBaseEmployeesPayrollItemList[]>([]);
  const customLib = lib();
  const { user } = useAuth();
  const userId = user?.user_id;
  const [userPayrollYears, setUserPayrollYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          // Years
          const res_year = await apiBase().payrollItem().getUserPayrollItemsYear(
            userId
          );

          if (res_year.status === 'success') {
            setUserPayrollYears(res_year.data);
          }

          // Employee payrolls
          const res = await apiBase().payrollItem().getEmployeesPayrollItems(
            (new Date()).getFullYear()
          );

          if (res.status === 'success') {
            setPayrollData(res.data);

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
  const fetchList = async () => {
    if (userId) {
      const payrolls = await apiBase()
        .payrollItem()
        .getEmployeesPayrollItems(
          selectYear.current ?? (new Date()).getFullYear(),
        );

      setPayrollData(payrolls.data);
    }
  };

  const handleFilterYear = (y?: number) => {
    selectYear.current = y;
    fetchList();
  };

  const header = [
    "Period",
    "Total Employees",
    "Total Disbursed",
    "Total Expenses",
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const apiBaseError = apiBase().error<IApiBaseError>();

  const [period, setPeriod] = useInput("");

  const handleModalOpen = (
  ) => {
    setModalOpen(true);
  }

  const handleSubmit: () => Promise<void> = async () => {
    try {
      const res = await apiBase().payrollItem().runEmployeesPayrollItems(period);

      if (res.status === 'success') {
        setModalOpen(false);
        fetchList();
        toast.success(res.message);
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  }

  return(
      <>
        <BaseModal
          open={modalOpen}
          setOpen={setModalOpen}
        >
          <div>
            <h1 className="text-lg font-semibold">Run Payroll</h1>
            <div className="grid gap-y-4 gap-x-5 my-6">
              <BaseInputDate
                id="date"
                label="Payroll Period"
                type="month"
                value={period}
                setValue={(e) => setPeriod(e.target.value)}
                error={apiBaseError.getErrors('period')?.[0].toString()}
              />
            </div>
            <div className="flex justify-end">
              <BaseInputButton
                text="Submit"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </BaseModal>
        {!isLoading ?
        <div className="flex flex-col gap-4 py-10 px-12">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-lg mb-1 text-gray-500">Payroll</h2>
                <h1 className="text-2xl font-bold">Employee&apos;s Payroll</h1>
              </div>
            </div>
            <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
              <div className="flex gap-5 max-md:gap-1 h-10">
                <FilterRadio
                  label="Year"
                  filterContent={userPayrollYears.map((year, index) => ({
                    label: String(year),
                    value: year
                  }))}
                  handler={handleFilterYear}
                  defaultVal={userPayrollYears.length > 0 ? (new Date()).getFullYear() : undefined}
                />
              </div>
              <BaseInputButton
                text="Run Payroll"
                onClick={() => handleModalOpen()}
              />
            </div>
          </div>
          <div className=" overflow-x-scroll rounded-lg border-1 max-xl:h-5/6">
            <table className=" w-full">
              <TableHeader headers={header} action={true} />
              <tbody>
                {payrollData.map((e, index) => {
                  const dataContent = [
                    customLib.formatYearMonthDate(e.period),
                    e.total_employees,
                    customLib.formatCurrency(e.total_disbursed),
                    customLib.formatCurrency(e.total_expenses)
                  ];

                  return (
                    <TableData
                      key={index}
                      dataContent={dataContent}
                      isProfile={false}
                      onClickOpen={() => {
                        const date = new Date(e.period);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const formattedDate = `${year}-${month}`;
                        window.open(`payroll/${formattedDate}`, '_blank');
                      }}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div> : 
        <div className='flex w-full h-[50vh] justify-center items-center'>
          <Spinner color="default" size="lg"/>
        </div>}
      </>
  );
};

export default ListPayroll;
