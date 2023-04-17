import { EmployeeType } from "./employee";

export type ProjectType = {
  id: string | number;
  name: string;
  employeeList: Array<EmployeeType>;
}
