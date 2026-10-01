import api from "./api";

export type ApiResponse<T> = {
  data: T;
};

export const studentDashboard = async () => {
  const { data } = await api.get("/student/dashboard");
  return data.data;
};

export const getStudentClass = async (id) => {
  const { data } = await api.get(`/student/getClass/${id}`);
  return data.data.class;
};

export const studentAttendanceForAdmin = async (payload) => {
  const { data } = await api.post("/student/getAttendance", payload);
  return data.data.attendance;
};

export const studentAttendance = async () => {
  const { data } = await api.get("/student/getAttendance");
  return data.data.attendance;
};

export const studentGrades = async (id) => {
  const { data } = await api.post(`/student/getGrades/${id}`);
  return data.data.grades;
};

export const studentSubjects= async () => {
  const { data } = await api.get(`/student/getsubjects`);
  return data.data.grades;
};
