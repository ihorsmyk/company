import { Position } from "../enums/position";
import { ProjectType } from "./project";

export type EmployeeType = {
  id: string | number | undefined;
  firstName: string;
  lastName?: string;
  email: string;
  position?: Position;
  project?: Array<ProjectType> | any;
};
