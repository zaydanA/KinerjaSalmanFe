import ProtectedRoute from "@/app/Rbac";
import ListReviewPayroll from "@/components/privates/payroll/ListReview";

const page = ()=>{
    return (
        <ProtectedRoute allowedDept={[1, 2]} allowedPos={[1, 2]}>
            <ListReviewPayroll />
        </ProtectedRoute>
    )
}
export default page;