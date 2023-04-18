import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EmployeeType } from "../types/employee";
import { ProjectType } from "../types/project";

export const companyService: AxiosInstance = axios.create({
  baseURL: "http://ec2-3-129-6-39.us-east-2.compute.amazonaws.com:8081/api/",
  params: {
    pageSize: 10,
  },
});

//EMPLOYEE

export const getEmployeeById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`employees/${id}`);
  return data;
};

export const updateEmployeeById = async (
  id: number,
  employee: EmployeeType
) => {
  const response: AxiosResponse = await companyService.put(
    `employees/${id}`,
    employee
  );
  return response;
};

export const deleteEmployeeById = async (id: number) => {
  const response: AxiosResponse = await companyService.delete(
    `employees/${id}`
  );
  return response;
};

export const addEpmloyee = async (employee: any) => {
  const response: AxiosResponse = await companyService.post(
    "employees",
    employee
  );
  return response;
};

//PROJECT

export const getProjectById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`projects/${id}`);
  return data;
};

export const updateProjectById = async (id: number, project: ProjectType) => {
  const response: AxiosResponse = await companyService.put(
    `projects/${id}`,
    project
  );
  return response;
};

export const deleteProjectById = async (id: number) => {
  const response: AxiosResponse = await companyService.delete(`projects/${id}`);
  return response;
};

export const addProject = async (project: any) => {
  const response: AxiosResponse = await companyService.post(
    "projects",
    project
  );
  return response;
};
