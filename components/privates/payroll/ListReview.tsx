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
import { IApiBaseError } from "@/types/http";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import BaseModal from "@/components/shares/modals/BaseModal";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import { IApiBaseBank } from "@/types/bank";

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
  const [currentBanks, setCurrentBanks] = useState<IApiBaseBank[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const selectDepartment = useRef<number[] | undefined>();
  const selectPosition = useRef<number[] | undefined>();
  const selectStatus = useRef<number[] | undefined>();
  const searchValue = useRef<string | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiBaseError = apiBase().error<IApiBaseError>();
  // This only called once when the page rendered
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await api.department().getDepartment();
        const positions = await api.position().getPosition();
        const banks = await apiBase().bank().getBank();
        const payrollReviewData = await api.payrollItem().getEmployeesReviewPayrollItems(
          pathname[2]
        );

        setPayrollReviewData(payrollReviewData.data.data);
        setTotalPage(payrollReviewData.data.last_page);
        setCurrentDepartments(departments.data);
        setCurrentPositions(positions.data);
        setCurrentBanks(banks.data);

        setIsLoading(false);
      } catch (error) {
        apiBaseError.set(error);
                
        router.push('/payroll');
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

  const [formView, setFormView] = useState<IApiBaseEmployeesReviewPayrollItemList>();
  const [payrollId, setPayrollId] = useState<number>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<number>(0);

  const handleModalOpen = (
    full_name: string,
    email: string,
    employee_id: string,
    dept_id: number,
    position_id: number,
    npwp_number: string,
    bank_id: number,
    bank_account_number: string,
    bank_account_holder: string,
    status: number,
    net_salary: number,
    payroll_id?: number
  ) => {
    setFormView(
      {
        payroll: {
          user: {
            full_name: full_name,
            email: email,
            employee_id: employee_id,
            dept_id: dept_id,
            position_id: position_id
          },
          npwp_number: npwp_number,
          bank_id: bank_id,
          bank_account_number: bank_account_number,
          bank_account_holder: bank_account_holder
        },

        status: status,
        net_salary: net_salary
      }
    );

    setStatus(status);
    setPayrollId(payroll_id);
    setModalOpen(true);
  }

  const handleSubmit: () => Promise<void> = async () => {
    try {
      if (payrollId) {
        const res = await apiBase().payrollItem().updateEmployeesReviewPayrollItems(
          payrollId,
          pathname[2],
          status
        )

        if (res.status === 'success') {
          // Update
          const indexToUpdate = payrollReviewData.findIndex(entry => entry.payroll_id === payrollId);
          
          setPayrollReviewData(prevData => {
            const newData = [...prevData];
            newData[indexToUpdate] = { ...newData[indexToUpdate], ...res.data };
            return newData;
          });
          
          setModalOpen(false);
          setPayrollId(undefined);

          toast.success(res.message);
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  }

  return (
    <>
    <BaseModal
      open={modalOpen}
      setOpen={setModalOpen}
    >
      <div>
        <h1 className="text-lg font-semibold">Payment</h1>
        <h2 className="text-sm">{customLib.formatYearMonthDate(pathname[2], true)}</h2>
        <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
          <BaseInputText
            id="full_name"
            label="Full Name"
            type="text"
            disabled={true}
            value={formView?.payroll.user.full_name}
          />
          <DropdownInput
            id="dept_id"
            label="Department"
            disabled={true}
            options= {currentDepartments.map(department => ({ value: department.dept_id, label: department.dept_name }))}
            selectedValue={formView?.payroll.user.dept_id ?? ''}
          />
          <DropdownInput
            id="position_id"
            label="Position"
            disabled={true}
            options= {currentPositions.map(position => ({ value: position.position_id, label: position.title }))}
            selectedValue={formView?.payroll.user.position_id ?? ''}
          />
          <BaseInputText
            id="npwp_number"
            label="NPWP Number"
            fixedLength={16}
            format="#### #### #### ####"
            disabled={true}
            type="text"
            value={formView?.payroll.npwp_number}
          />

          <DropdownInput
            id="bank_id"
            label="Bank"
            disabled={true}
            options= {currentBanks.map(bank => ({ value: bank.bank_id, label: bank.bank_name }))}
            selectedValue={formView?.payroll.bank_id ?? ''}
          />

          <BaseInputText
            id="bank_account_number"
            label="Bank Account Number"
            maxLength={16}
            type="number"
            disabled={true}
            value={formView?.payroll.bank_account_number}
          />

          <div className="col-span-2">
            <BaseInputText
              id="bank_account_holder"
              label="Bank Account Holder Name"
              toUppercase={true}
              maxLength={255}
              type="text"
              disabled={true}
              value={formView?.payroll.bank_account_holder}
            />
          </div>

          <BaseInputText
            id="net_salary"
            label="Net Salary"
            type="currencies"
            disabled={true}
            value={formView?.net_salary}
          />

          <DropdownInput
            id="status"
            label="Status"
            required={true}
            options= {["Not Paid", "Paid"].map((val, index) => ({
              label: val,
              value: index
            }))}
            selectedValue={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
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
              <h2 className="text-lg mb-1 text-gray-500">Payroll Review</h2>
              <h1 className="text-2xl font-bold">{customLib.formatYearMonthDate(pathname[2], true)}</h1>
            </div>
          </div>
          <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
            <div className="flex gap-5 max-md:gap-1">
              <Filter
                label="Payment Status"
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
                    onClickEdit={() => handleModalOpen(
                      e.payroll.user.full_name,
                      e.payroll.user.email,
                      e.payroll.user.employee_id,
                      e.payroll.user.dept_id,
                      e.payroll.user.position_id,
                      e.payroll.npwp_number,
                      e.payroll.bank_id,
                      e.payroll.bank_account_number,
                      e.payroll.bank_account_holder,
                      e.status,
                      e.net_salary,
                      e.payroll_id
                    )}
                    onClickOpen={() => {
                      window.open(`/my-payroll/${e.payroll_id}/items/${pathname[2]}`, '_blank');
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
    : 
    <div className='flex w-full h-[50vh] justify-center items-center'>
      <Spinner color="default" size="lg"/>
    </div>}
    </>
  );
};

export default ListReviewPayroll;
