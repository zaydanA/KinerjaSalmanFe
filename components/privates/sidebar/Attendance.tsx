import { apiBase } from "@/api";
import BaseModal from "@/components/shares/modals/BaseModal";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { lib } from "@/lib";
import { IApiAttendanceData, IApiUpdateAttendancePayload } from "@/types/attendance";
import { IApiBaseError, IApiBaseResponse } from "@/types/http";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import Filter from "../employees/Filter";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import BaseInputTextArea from "@/components/shares/inputs/BaseInputTextArea";
import BaseInputTime from "@/components/shares/inputs/BaseInputTime";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import { AttendanceType } from "@/enums/enums";
import Pagination from "@/components/shares/pagination/Pagination";
import FilterRadio from "../attendance/FilterRadio";
import { useAuth } from "@/contexts";

const initialFormData: IApiUpdateAttendancePayload = {
  date: '',
  attendance_type: '',
  clock_in: '',
  clock_out: '',
  notes : ''
}

function generateMonthOptions() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return months.map((month, index) => ({
    label: month,
    value: index + 1
  }));
}

const Attendance = (props:any) => {
  const [attendanceData, setAttendanceData] = useState<IApiAttendanceData[]>([]);
  const customLib = lib();
  const pathname = usePathname().split("/")
  const userId = props.user ? props.user.user_id : pathname[2];
  const [userYears, setUserYears] = useState<number[]>([]);
  const { isHRDManagerOrDirector, isManager } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // My attendances
        const res = await apiBase().attendance().getUserAttendance(
          userId
        );

        if (res.status === 'success') {
          setAttendanceData(res.data.data);
          setTotalPage(res.data.last_page);
          setCurrentPage(res.data.current_page);
        }

        // Years
        const res_year = await apiBase().attendance().getUserAttendanceYear(
          userId
        );

        if (res_year.status === 'success') {
          setUserYears(res_year.data);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const selectYear = useRef<number | undefined>();
  const selectMonth = useRef<number | undefined>();
  const selectAttendanceType = useRef<string[] | undefined>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchList = async ({
    page,
  }: {
    search?: string;
    page: number;
    filterAttendanceType?: string[];
    filterDepartment?: number[];
    filterPosition?: number[];
  }) => {
    const attendances = await apiBase()
      .attendance()
      .getUserAttendance(
        userId,
        false,
        page,
        10,
        selectAttendanceType.current,
        selectYear.current,
        selectMonth.current,
      );

    setCurrentPage(page);
    setAttendanceData(attendances.data.data);
    setTotalPage(attendances.data.last_page);
  };

  const handleFilterAttendanceType = (s?: string[]) => {
    selectAttendanceType.current = s;
    fetchList({ page: 1 });
  };

  const handleFilterYear = (y?: number) => {
    selectYear.current = y;
    fetchList({ page: 1 });
  };

  const handleFilterMonth = (m?: number | undefined) => {
    selectMonth.current = m;
    fetchList({ page: 1 });
  };

  const onPageChange = (pageNumber: number) => {
    fetchList({ page: pageNumber });
  };

  const header = [
    "Date",
    "Attendance Type",
    "Clock In",
    "Clock Out"
  ];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<IApiUpdateAttendancePayload>(initialFormData);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const apiBaseError = apiBase().error<IApiBaseError>();

  const handleModalOpen = (
    date: string,
    attendance_type: string,
    clock_in: string | null,
    clock_out: string | null,
    notes?: string
  ) => {
    setFormData({
      date,
      attendance_type,
      clock_in,
      clock_out,
      notes: notes ?? ''
    });

    setSelectedDate(date);
    setModalOpen(true);
  }

  const handleSubmit: () => Promise<void> = async () => {
    try {
      const res = await apiBase().attendance().updateUserAttendance(userId, formData);

      if (res.status === 'success') {
        // Update
        const indexToUpdate = attendanceData.findIndex(entry => entry.date === selectedDate);
        
        setAttendanceData(prevData => {
          const newData = [...prevData];
          newData[indexToUpdate] = { ...newData[indexToUpdate], ...res.data };
          return newData;
        });
        
        setModalOpen(false);
        setSelectedDate(null);
      }
    } catch (error) {
      apiBaseError.set(error);
      //TODO: toast
    }
  }

  return(
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
        <div>
          <div className='max-h-5/6 overflow-y-auto'>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex w-full justify-between max-md:gap-2 max-sm:flex-col">
                  <div className="flex gap-5 max-md:gap-1 h-8">
                    <Filter
                      label="Attendance Type"
                      filterContent={
                        Object.keys(AttendanceType).map(attendance_type => ({
                          value: attendance_type,
                          label: customLib.toLabelCase(attendance_type, false)
                        }))
                      }
                      handler={handleFilterAttendanceType}
                    />
                    <FilterRadio
                      label="Month"
                      filterContent={generateMonthOptions()}
                      handler={handleFilterMonth}
                    />
                    <FilterRadio
                      label="Year"
                      filterContent={userYears.map((year, index) => ({
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
                    {attendanceData.map((e, index) => {
                      const dataContent = [
                        customLib.formatDate(e.date),
                        customLib.toLabelCase(e.attendance_type, false),
                        customLib.toHoursMinutes(e.clock_in) ?? '-',
                        customLib.toHoursMinutes(e.clock_out) ?? '-'
                      ];

                      if (!isHRDManagerOrDirector() && !isManager()) {
                        return (
                          <TableData
                            key={index}
                            dataContent={dataContent}
                            isProfile={false}
                          />
                        );
                      }
                      
                      return (
                        <TableData
                          key={index}
                          dataContent={dataContent}
                          onClickEdit={() => handleModalOpen(
                            e.date,
                            e.attendance_type,
                            e.clock_in,
                            e.clock_out,
                            e.notes
                          )}
                          isProfile={false}
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
          </div>
        </div>
      </>
  );
}

export default Attendance;