"use client";

import { apiBase } from "@/api";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { IApiBaseError } from "@/types/http";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IApiBasePayrollItemDetails } from "@/types/payroll.item";
import { lib } from "@/lib";

const PayrollDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname().split("/");
  const apiBaseError = apiBase().error<IApiBaseError>();
  const customLib = lib();

  const [payrollDetails, setPayrollDetails] = useState<IApiBasePayrollItemDetails>();

  const router = useRouter();
  const userId = parseInt(pathname[2]);
  const period = pathname[4];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId && period) {
          // Payroll Details
          const res = await apiBase().payrollItem().getUserPayrollItemsDetails(
            userId,
            period
          );

          if (res.status === 'success') {
            setPayrollDetails(res.data);

            setIsLoading(false);
          }
        }
      } catch (error) {
        apiBaseError.set(error);
                
        if (apiBaseError.getStatusCode() === 404) { // Not Found
          router.push('/my-payroll');
        }
      }
    };

    fetchData();
  }, []);

  return(
      <>
        {!isLoading ?
        <div className="flex flex-col gap-4 py-10 px-12">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-lg mb-1 text-gray-500">Payroll Details</h2>
                <h1 className="text-2xl font-bold">{customLib.formatYearMonthDate(period, true)}</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-2/3 text-sm mb-4 grid grid-cols-2 gap-x-4">
              <div>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="col-span-1">Name</div>
                  <div className="col-span-1">: {payrollDetails?.payroll.user.full_name}</div>
                  <div className="col-span-1">Employee ID</div>
                  <div className="col-span-1">: {payrollDetails?.payroll.user.employee_id}</div>
                  <div className="col-span-1">Department</div>
                  <div className="col-span-1">: {payrollDetails?.payroll.user.dept.dept_name}</div>
                  <div className="col-span-1">Position</div>
                  <div className="col-span-1">: {payrollDetails?.payroll.user.position.title}</div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="col-span-1">Employee Status</div>
                  <div className="col-span-1">: {payrollDetails?.payroll.user.status == 1 ? "Active" : "Inactive"}</div>
                  <div className="col-span-1">PTKP Status</div>
                  <div className="col-span-1">: {payrollDetails?.details?.ptkp_status}</div>
                  <div className="col-span-1">Join Date</div>
                  <div className="col-span-1">: {customLib.formatDate(payrollDetails?.payroll.user.join_date ?? '')}</div>
                  <div className="col-span-1">Length of Service</div>
                  <div className="col-span-1">: {customLib.getDateDifference(new Date().toString(), payrollDetails?.payroll.user.join_date ?? '')}</div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex items-center justify-center">
            <table className="w-1/2 text-sm">
              <tr><td className="w-2/3 align-top p-2 border-black border-t-1 border-x-1">Gaji</td><td className="w-1/3 align-top p-2 border-black border-t-1 border-x-1">{customLib.formatCurrency(payrollDetails?.details?.income?.basic_salary ?? 0)}</td></tr>
              {payrollDetails?.details?.income?.allowances && payrollDetails.details.income.allowances.map((allowance) => (
                <tr key={allowance.name}>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">{allowance.name} {allowance.ket ? `(${allowance.ket})` : ""}</td>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">{customLib.formatCurrency(allowance.val ?? 0)}</td>
                </tr>
              ))}

              <tr><td className="w-2/3 align-top p-2 border-black border font-semibold bg-gray-200">Penghasilan Bruto</td><td className="w-1/3 align-top p-2 border-black border font-semibold bg-gray-200">{customLib.formatCurrency(payrollDetails?.details?.gross_income ?? 0)}</td></tr>
              
              <tr><td className="w-2/3 align-top p-2 border-black border-t-1 border-x-1">Dikurangi: </td><td className="w-1/3 align-top p-2 border-black border-t-1 border-x-1"></td></tr>
              {payrollDetails?.details?.deductions && payrollDetails.details.deductions.map((deduction) => (
                <tr key={deduction.name}>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">{deduction.name} {deduction.ket ? `(${deduction.ket})` : ""}</td>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">{customLib.formatCurrency(deduction.val ?? 0)}</td>
                </tr>
              ))}

              <tr><td className="w-2/3 align-top p-2 border-black border font-semibold bg-gray-200">Penghasilan Neto</td><td className="w-1/3 align-top p-2 border-black border font-semibold bg-gray-200">{customLib.formatCurrency(payrollDetails?.details?.net_income ?? 0)}</td></tr>
              <tr><td className="w-2/3 align-top p-2 border-black border font-semibold bg-gray-200">Penghasilan Neto Setahun</td><td className="w-1/3 align-top p-2 border-black border font-semibold bg-gray-200">{customLib.formatCurrency(payrollDetails?.details?.net_income_yearly ?? 0)}</td></tr>

              <tr><td className="w-2/3 align-top p-2 border-black border-t-1 border-x-1">Dikurangi: </td><td className="w-1/3 align-top p-2 border-black border-t-1 border-x-1"></td></tr>
              <tr><td className="w-2/3 align-top p-2 border-black border-x-1">Penghasilan Tidak Kena Pajak (PTKP) {payrollDetails?.details?.ptkp_status}</td><td className="w-1/3 align-top p-2 border-black border-x-1">{customLib.formatCurrency(payrollDetails?.details?.ptkp ?? 0)}</td></tr>

              <tr><td className="w-2/3 align-top p-2 border-black border font-semibold bg-gray-200">Penghasilan Kena Pajak (PKP)</td><td className="w-1/3 align-top p-2 border-black border font-semibold bg-gray-200">{customLib.formatCurrency(payrollDetails?.details?.pkp ?? 0)}</td></tr>
              <tr><td className="w-2/3 align-top p-2 border-black border-x-1">PPH 21 Terutang Setahun</td><td className="w-1/3 align-top p-2 border-black border-x-1">{payrollDetails?.details?.pph21_yearly_details ? '' : customLib.formatCurrency(payrollDetails?.details?.pph21_yearly ?? 0)}</td></tr>
              {payrollDetails?.details?.pph21_yearly_details && payrollDetails.details.pph21_yearly_details.map((details, idx) => (
                <tr key={details.name}>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">{details.ket}</td>
                  <td className="w-2/3 align-top p-2 border-black border-x-1">
                    {idx === (payrollDetails.details?.pph21_yearly_details?.length ? payrollDetails.details?.pph21_yearly_details?.length - 1 : null) ? customLib.formatCurrency(payrollDetails?.details?.pph21_yearly ?? 0) : ""}
                  </td>
                </tr>
              ))}


              <tr><td className="w-2/3 align-top p-2 border-black border">PPH 21 Dipotong Sebulan</td><td className="w-1/3 align-top p-2 border-black border">{customLib.formatCurrency(payrollDetails?.details?.pph21_monthly ?? 0)}</td></tr>
            
              <tr><td className="w-2/3 align-top p-2 border-black border font-semibold bg-gray-200">Gaji Bersih Diterima Karyawan</td><td className="w-1/3 align-top p-2 border-black border font-semibold bg-gray-200">{customLib.formatCurrency(payrollDetails?.details?.take_home_pay ?? 0)}</td></tr>
            </table>
          </div>
        </div> : 
        <div className='flex w-full h-[50vh] justify-center items-center'>
          <Spinner color="default" size="lg"/>
        </div>}
      </>
  );
};

export default PayrollDetails;
