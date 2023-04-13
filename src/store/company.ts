// import { ProjectType } from './../interfaces/project.interface';
// import { EmployeeType } from './../interfaces/employee.interface';
import { makeAutoObservable } from "mobx";
import { EmployeeType } from "../types/employee";
import { ProjectType } from "../types/project";
import { Position } from "../enums/position";

class Company {
  token: boolean = false;
  isLoading: boolean = false;
  error: boolean = false;

  admin: any = null;

  employeeList: Array<EmployeeType> = [];
  projectList: Array<ProjectType> = [];

  constructor() {
    makeAutoObservable(this);
  }

  setToken(set: boolean): void {
    this.token = set;
  }

  setError(set: boolean): void {
    this.error = set;
  }

  setIsLoading(set: boolean): void {
    this.isLoading = set;
  }

  addEmployee(
    id: string | number,
    firstName: string,
    lastName: string,
    email: string,
    position: Position,
    project: Array<ProjectType>
  ): EmployeeType {
    return { id, firstName, lastName, email, position, project };
  }

  addProject(
    id: string | number,
    name: string,
    employeeList: Array<EmployeeType>
  ): ProjectType {
    return { id, name, employeeList };
  }
}

export default new Company();
