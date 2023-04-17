import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EmployeeType } from "../types/employee";
import { ProjectType } from "../types/project";

export const companyService: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  params: {
    pageSize: 10,
  },
});

//EMPLOYEE

export const getEmployeeById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`employee/${id}`);
  return data;
};

export const updateEmployeeById = async (
  id: number,
  employee: EmployeeType
) => {
  const response: AxiosResponse = await companyService.put(
    `employee/${id}`,
    employee
  );
  return response;
};

export const deleteEmployeeById = async (id: number) => {
  const response: AxiosResponse = await companyService.delete(`employee/${id}`);
  return response;
};

export const addEpmloyee = async (employee: any) => {
  const response: AxiosResponse = await companyService.post(
    "employee",
    employee
  );
  return response;
};

//PROJECT

export const getProjectById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`project/${id}`);
  return data;
};

export const updateProjectById = async (id: number, project: ProjectType) => {
  const response: AxiosResponse = await companyService.put(
    `project/${id}`,
    project
  );
  return response;
};

export const deleteProjectById = async (id: number) => {
  const response: AxiosResponse = await companyService.delete(`project/${id}`);
  return response;
};

export const addProject = async (project: any) => {
    const response: AxiosResponse = await companyService.post(
      "project",
      project
    );
    return response;
}
