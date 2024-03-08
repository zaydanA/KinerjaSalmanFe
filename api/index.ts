import auth from "./auth"
import user from "./user"
import error from './error';
import employee from "./employee";
import position from "./position";
import department from "./department";

export const apiBase = () => {
  return {
    auth,
    user,
    error,
    employee,
    position,
    department,
  }
}