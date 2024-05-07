import auth from "./auth";
import user from "./user";
import error from "./error";
import employee from "./employee";
import position from "./position";
import department from "./department";
import dependent from "./dependent";
import analytics from "./analytics";
import attendance from "./attendance";
import application from "./application";
import bank from "./bank";
import allowance from "./allowance";
import payrollItem from "./payroll.item";
import kpi from "./kpi";

export const apiBase = () => {
  return {
    auth,
    user,
    error,
    employee,
    position,
    department,
    dependent,
    analytics,
    attendance,
    application,
    bank,
    allowance,
    payrollItem,
    kpi,
  };
};
