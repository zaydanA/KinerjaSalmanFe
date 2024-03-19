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
import { IApiAttendanceList, IApiAttendancePagination, IApiUpdateAttendancePayload } from "@/types/attendance";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBasePosition } from "@/types/position";
import { AttendanceType } from "@/enums/enums";
import TableHeader from "@/components/shares/tables/TableHeader";
import BaseModal from "@/components/shares/modals/BaseModal";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import { IApiBaseError } from "@/types/http";
import BaseInputTime from "@/components/shares/inputs/BaseInputTime";
import BaseInputTextArea from "@/components/shares/inputs/BaseInputTextArea";

const initialFormData: IApiUpdateAttendancePayload = {
  date: '',
  attendance_type: '',
  clock_in: '',
  clock_out: '',
  notes : ''
}

const ListAttendance = () => {
  const api = apiBase();
  const customLib = lib();

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

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<IApiUpdateAttendancePayload>(initialFormData);
  const [userOpen, setUserOpen] = useState<number | null>(null);
  const apiBaseError = apiBase().error<IApiBaseError>();

  const handleModalOpen = (
    user_id: number,
    date: string,
    attendance_type: string,
    clock_in: string | null,
    clock_out: string | null,
    notes : string
  ) => {
    setFormData({
      date,
      attendance_type,
      clock_in,
      clock_out,
      notes: notes ?? ''
    });

    setUserOpen(user_id);
    setModalOpen(true);
  }

  const handleSubmit: () => Promise<void> = async () => {
    try {
      if (userOpen) {
        const res = await apiBase().attendance().updateUserAttendance(userOpen, formData);

        if (res.status === 'success') {
          // Update
          const indexToUpdate = currentAttendances.findIndex(entry => entry.user_id === userOpen);
          
          setCurrentAttendances(prevData => {
            const newData = [...prevData];
            newData[indexToUpdate] = { ...newData[indexToUpdate], ...res.data };
            return newData;
          });
          
          setModalOpen(false);
          setUserOpen(null);
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      //TODO: toast
    }
  }
  
  return (
    <>
      <BaseModal
        open={modalOpen}
        setOpen={setModalOpen}
      >
        <div>
          <h1 className="text-lg font-semibold">Attendance Details</h1>
          <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
            <BaseInputText
              id="date"
              label="Date"
              placeholder="Date"
              type="text"
              disabled={true}
              value={customLib.formatDate(formData.date)}
              error={apiBaseError.getErrors('date')?.[0].toString()}
            />
            <DropdownInput
              id="attendance_type"
              label="Attendance Type"
              required={true}
              options={Object.keys(AttendanceType).map(attendance_type => ({ value: attendance_type, label: customLib.toLabelCase(attendance_type, false) }))}
              selectedValue={formData.attendance_type}
              error={apiBaseError.getErrors('attendance_type')?.[0].toString()}
              onChange={(e) => setFormData({
                ...formData,
                attendance_type: e.target.value
              })}
            />
            <BaseInputTime
              id="clock_in"
              label="Clock In"
              value={customLib.toHoursMinutes(formData.clock_in) as string}
              error={apiBaseError.getErrors('clock_in')?.[0].toString()}
              setValue={(e) => setFormData({
                ...formData,
                clock_in: customLib.fromHoursMinutes(e.target.value)
              })}
            />
            <BaseInputTime
              id="clock_out"
              label="Clock Out"
              value={customLib.toHoursMinutes(formData.clock_out) as string}
              error={apiBaseError.getErrors('clock_out')?.[0].toString()}
              setValue={(e) => setFormData({
                ...formData,
                clock_out: customLib.fromHoursMinutes(e.target.value)
              })}
            />

            <div className="col-span-2">
              <BaseInputTextArea
                id="notes"
                label="Notes"
                placeholder="Notes"
                value={formData.notes}
                error={apiBaseError.getErrors('notes')?.[0].toString()}
                setValue={(e) => setFormData({
                  ...formData,
                  notes: e.target.value
                })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <BaseInputButton
              text="Submit"
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </BaseModal>
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
                    onClickEdit={() => handleModalOpen(
                      e.user_id,
                      e.date,
                      e.attendance_type,
                      e.clock_in,
                      e.clock_out,
                      e.notes
                    )}
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