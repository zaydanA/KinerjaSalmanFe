import auth from "./auth"
import user from "./user"
import error from './error';
import employee from "./employee";
import position from "./position";
import department from "./department";
import analytics from "./analytics";
import attendance from "./attendance";

export const apiBase = () => {
  return {
    auth,
    user,
    error,
    employee,
    position,
    department,
    analytics,
    attendance
  }
}