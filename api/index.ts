import auth from "./auth"
import user from "./user"
import error from './error';

export const apiBase = () => {
  return {
    auth,
    user,
    error
  }
}