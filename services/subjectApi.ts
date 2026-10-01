import api from "./api";

export const getSubjectClasses = async (id,params = {}) => {
  const { data } = await api.get(`/subject/getClasses/${id}`, { params });

  return data.data.classes;
};

export const getSubjectTeachers = async (id,params = {}) => {
  const { data } = await api.get(`/subject/getTeachers/${id}`, { params });
  console.log(data.data)

  return data.data.teachers;
};