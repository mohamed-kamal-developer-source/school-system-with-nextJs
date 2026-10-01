import api from "./api";

export const getclassSubjects = async (id, params = {}) => {
  const { data } = await api.get(`/class/getSubjects/${id}`, { params });

  return data.data.subjects;
};

export const getclassTeachers = async (id, params = {}) => {
  const { data } = await api.get(`/class/getTeachers/${id}`, { params });

  return data.data.teachers;
};

export const getclassStudents = async (id, params = {}) => {
  const { data } = await api.get(`/class/getStudents/${id}`, { params });

  return data.data.students;
};

export const getclassAttendance = async (payload, params = {}) => {
  const { data } = await api.post(`/class/getAttendance`, {
    ...payload,
    ...params,
  });

  return data.data.attendance;
};


export const getclassGrades = async (payload, params = {}) => {
  const { data } = await api.post(`/class/getGrades`, {
    ...payload,
    ...params,
  });

  return data.data.grades;
};
