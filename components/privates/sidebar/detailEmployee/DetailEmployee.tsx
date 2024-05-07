"use client";
import Sidebar from "@/components/privates/sidebar/Sidebar";
import { Avatar } from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import { PiCalculatorThin } from "react-icons/pi";
import { CiTimer } from "react-icons/ci";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import Personal from "@/components/privates/sidebar/Personal";
import Employment from "@/components/privates/sidebar/Employment";
import { IUserPersonalData, IUserSelfData } from "@/types/user";
import { usePathname } from "next/navigation";
import { apiBase } from "@/api";
import { useRouter } from "next/navigation";
import { IApiBaseError } from "@/types/http";
import Attendance from "../Attendance";
import PayrollInfo from "../PayrollInfo";

const SidebarData = [
  {
    title: "General",
    icon: <CiUser />,
    iconOpened: (
      <RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    iconClosed: (
      <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    subNav: [
      {
        title: "Personal",
      },
      {
        title: "Employment",
      },
      {
        title: "Education & Experience",
      },
      {
        title: "Additional Info",
      },
    ],
  },
  {
    title: "Time Management",
    icon: <CiTimer />,
    iconOpened: (
      <RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    iconClosed: (
      <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    subNav: [
      {
        title: "Attendance",
      },
    ],
  },
  {
    title: "Payroll",
    icon: <PiCalculatorThin />,
    iconOpened: (
      <RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    iconClosed: (
      <RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]" />
    ),
    subNav: [
      {
        title: "Payroll Info",
      },
    ],
  },
];

const NavbarComponentData = [
  {
    title: "Basic Info",
  },
  {
    title: "Dependent",
  },
];

interface DetailEmployeeType {
  // employee: IUserPersonalData|null
  user: IUserSelfData | undefined | null;
  // page:string
}
const DetailEmployee: React.FC<DetailEmployeeType> = (props) => {
  const [employee, setEmployee] = useState<
    IUserPersonalData | null | undefined
  >({
    email: "",
    full_name: "",
    phone_number: "",
    emergency_number: "",
    place_of_birth: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    blood_type: "",
    identity_number: "",
    address: "",
    last_education: "",
  });
  const pathname = usePathname().split("/");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const apiBaseError = apiBase().error<IApiBaseError>();

  useEffect(() => {
    async function getEmployeeById() {
      try {
        const id = props.user ? props.user.user_id : Number(pathname[2]);
        const res = await apiBase().user().personalData(id);

        if (res.status === "success") {
          setIsAuthenticated(true);
          setEmployee(res.data);
        }
      } catch (error) {
        apiBaseError.set(error);

        if (apiBaseError.getStatusCode() === 403) {
          // Forbidden
          router.push("/dashboard");
        }
      }
    }
    getEmployeeById();
  }, []);

  const [activeComponent, setActiveComponent] = useState(
    SidebarData[0].subNav[0].title,
  );
  const [activeComponentNavbar, setActiveComponentNavbar] = useState(
    NavbarComponentData[0].title,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return isAuthenticated ? (
    <div className="flex h-fit min-h-[90%] rounded-lg border-1 bg-white shadow-md md:m-0 md:w-full">
      <div
        className={`z-20 flex h-fit w-fit max-w-[240px] flex-col rounded-l-lg bg-white pt-3 ${isSidebarOpen ? "absolute h-fit w-full border-1 shadow-lg md:relative md:h-full md:border-b-0 md:border-r-0 md:shadow-none" : "h-full"}`}
      >
        <div className="flex w-full flex-row bg-white px-1">
          {isSidebarOpen ? (
            <IoCloseOutline
              className="text-3xl"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            ></IoCloseOutline>
          ) : (
            <IoMenuOutline
              className="text-3xl"
              onClick={() => {
                setIsSidebarOpen(true);
              }}
            ></IoMenuOutline>
          )}
        </div>
        <div
          className={`h-full flex-col flex-col items-center p-2 duration-300 ease-in-out ${isSidebarOpen ? "min-w-[236px] rounded-l-lg bg-white" : "hidden"}`}
        >
          <div
            className={`m-3 flex h-[197px] flex-col items-center border-b-1 pb-2 `}
          >
            <Avatar showFallback className="mb-2 h-[80px] w-[80px]" />
            <h1 className="my-2 text-center text-lg font-semibold">
              {employee?.full_name}
            </h1>
            {props.user ? (
              <p className="text-center text-xs font-extralight">
                {props.user.position.title}
              </p>
            ) : (
              <p className="text-center text-xs font-extralight">
                {employee?.email}
              </p>
            )}
          </div>
          <div className="flex h-fit w-full cursor-pointer flex-col bg-white">
            <Sidebar
              SidebarData={SidebarData}
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            ></Sidebar>
          </div>
        </div>
      </div>
      <div
        className={`flex w-[90%] flex-col border-l-1 py-[14px] pl-2 pr-2 md:w-full md:px-[24px] ${isSidebarOpen ? "ml-[38px] md:ml-0" : ""}`}
      >
        <div className="z-[1] mb-[14px] flex min-h-[52px] flex-col gap-1">
          <Breadcrumbs isDisabled size="sm">
            <BreadcrumbItem>{pathname[1]}</BreadcrumbItem>
            <BreadcrumbItem>{employee?.full_name}</BreadcrumbItem>
            <BreadcrumbItem>{activeComponent}</BreadcrumbItem>
            <BreadcrumbItem>{activeComponentNavbar}</BreadcrumbItem>
          </Breadcrumbs>
          <h1 className="h-full w-full text-xl font-semibold text-[--kinerja-gold] md:text-2xl">
            {activeComponent}
          </h1>
        </div>
        <div className="flex h-full flex-col ">
          {/* {
                       activeComponent == SidebarData[0].subNav[0].title? <Personal employee={employee} activeComponentNavbar={activeComponentNavbar} NavbarComponentData={NavbarComponentData} setActiveComponentNavbar={setActiveComponentNavbar}></Personal>: (activeComponent == SidebarData[0].subNav[1].title? <Employment user={props.user}></Employment> : null)
                    } */}
          {(() => {
            switch (activeComponent) {
              case SidebarData[0].subNav[0].title:
                return (
                  <Personal
                    employee={employee}
                    activeComponentNavbar={activeComponentNavbar}
                    NavbarComponentData={NavbarComponentData}
                    setActiveComponentNavbar={setActiveComponentNavbar}
                  />
                );
              case SidebarData[0].subNav[1].title:
                return <Employment user={props.user} />;
              case SidebarData[1].subNav[0].title:
                return <Attendance user={props.user} />;
              case SidebarData[2].subNav[0].title:
                return <PayrollInfo user={props.user} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  ) : null;
};
export default DetailEmployee;
