import ProtectedRoute from "@/app/Rbac";
import ListPayroll from "@/components/privates/payroll/List";

const page = ()=>{
    return (
        <ProtectedRoute allowedDept={[1, 2]} allowedPos={[1, 2]}>
            <ListPayroll />
        </ProtectedRoute>
    )
}
export default page;