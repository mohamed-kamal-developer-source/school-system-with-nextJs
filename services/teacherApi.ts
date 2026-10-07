import api from "./api";

export type ApiResponse<T> = {
  data: T;
};

export const teacherClasses = async (payload = {}) => {
  const { data } = await api.get(`/teacher/teacherClasses`, {
    params: payload,
  });
  return data.data.classes;
};

export const teacherGradesForClass = async (payload = {}) => {
  const { data } = await api.post(`/teacher/gradesClass`, payload);
  return data.data.grades;
};

export const addGrade = async (payload = {}) => {
  const { data } = await api.post(`/teacher/addGrades`, payload);
  return data.data.grade;
};

export const updateGrade = async (id) => {
  const { data } = await api.patch(`/teacher/updateGrade/${id}`);
  return data.data.grades;
};

export const deleteGrade = async (id) => {
  const { data } = await api.delete(`/teacher/deleteGrade/${id}`);
  return data.data.grades;
};

export const addAttendance = async (payload = {}) => {
  const { data } = await api.post(`/teacher/addAttendance`, payload);
  return data.data.attendance;
};

export const importGrades = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/teacher/grades/import", formData);
  return data.data;
};

export const importAttendance = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/teacher/attendance/import", formData);
  return data.data;
};

export const updateAttendance = async (id) => {
  const { data } = await api.patch(`/teacher/updateAttendance/${id}`);
  return data.data.attendance;
};

export const deleteAttendance = async (id) => {
  const { data } = await api.delete(`/teacher/deleteAttendance/${id}`);
  return data.data.attendance;
};


export const teacherClassesForDashboard = async (payload = {}) => {
  const { data } = await api.get(`/teacher/teacherClasses`, {
    params: payload,
  });
  return { ...data.data };
};
