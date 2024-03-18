import ProtectedRoute from "@/app/Rbac";
import ListAttendance from "@/components/privates/attendance/List";

const page = ()=>{
  return (
    <ProtectedRoute allowedPos={[1, 2]}>
      <ListAttendance/>
    </ProtectedRoute>
  )
}
export default page;