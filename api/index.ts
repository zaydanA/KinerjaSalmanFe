import auth from "./auth"
import user from "./user"
import error from './error';
import employee from "./employee";

export const apiBase = () => {
  return {
    auth,
    user,
    error,
    employee
  }
}