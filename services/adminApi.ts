import api from "./api";

export type ApiResponse<T> = {
  data: T;
};

export const adminDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data.data;
};
// start subjects
export const getAllSubjects = async (params = {}) => {
  const { data } = await api.get("/subject", { params });
  return data.data.subjects;
};

export const createSubject = async (payload) => {
  const { data } = await api.post("/subject", payload);
  return data.data;
};
export const updateSubject = async (id, payload) => {
  const { data } = await api.patch(`/subject/${id}`, payload);
  return data.data;
};

export const deleteSubject = async (id) => {
  const { data } = await api.delete(`/subject/${id}`);
  return data.data;
};

// end subjects

// start students
export const getAllStudents = async (params = {}) => {
  const { data } = await api.get("/student", { params });
  return data.data.students;
};

export const createStudent = async (payload) => {
  const { data } = await api.post("/student", payload);
  return data.data;
};

export const importStudents = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/admin/students/import", formData);
  return data.data;
};
export const updateStudent = async (id, payload) => {
  const { data } = await api.patch(`/student/${id}`, payload);
  return data.data;
};

export const deleteStudent = async (id) => {
  const { data } = await api.delete(`/student/${id}`);
  return data.data;
};

export const enrollStudent = async (payload) => {
  const { data } = await api.post(`/enrollStudent`,payload);
  return data.data;
};

export const transferStudent = async (payload) => {
  const { data } = await api.patch(`/transferStudent`,payload);
  return data.data;
};

// end students


// start teachers
export const getAllTeachers = async (params = {}) => {
  const { data } = await api.get("/teacher", { params });
  return data.data.teachers;
};

export const createTeacher = async (payload) => {
  const { data } = await api.post("/teacher", payload);
  return data.data;
};
export const updateTeacher = async (id, payload) => {
  const { data } = await api.patch(`/teacher/${id}`, payload);
  return data.data;
};

export const deleteTeacher = async (id) => {
  const { data } = await api.delete(`/teacher/${id}`);
  return data.data;
};

// end teachers

// start classes

export const getAllClasses = async (params = {}) => {
  const { data } = await api.get("/class", { params });
  return data.data.classes;
};

export const createClass = async (payload) => {
  const { data } = await api.post("/class", payload);
  return data.data;
};
export const updateClass = async (id, payload) => {
  const { data } = await api.patch(`/class/${id}`, payload);
  return data.data;
};

export const deleteClass = async (id) => {
  const { data } = await api.delete(`/class/${id}`);
  return data.data;
};

// end classes
export const getAllClassSubjects = async (id,params = {}) => {
  const { data } = await api.get(`/classSubjects/${id}`, { params });
  return data.data.classSubjects;
};

export const createClassSubject = async (payload) => {
  const { data } = await api.post("/classSubjects", payload);
  return data.data;
};
export const updateClassSubjects = async (id, payload) => {
  const { data } = await api.patch(`/classSubjects/${id}`, payload);
  return data.data;
};

export const deleteClassSubjects = async (id) => {
  const { data } = await api.delete(`/classSubjects/deleteTeacher/${id}`);
  return data.data;
};
// start classSubjects

// end classSubjects
