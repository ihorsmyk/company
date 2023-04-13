import { Position } from "../enums/position";
import { ProjectType } from "./project";

export type EmployeeType = {
  id: string | number;
  firstName: string;
  lastName?: string;
  email: string;
  position?: Position;
  project?: Array<ProjectType>;
};
