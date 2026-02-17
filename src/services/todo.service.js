import { api } from "./api";

export const getTasks = async (page = 1) => {
  const res = await api.get(`/tasks?page=${page}&limit=10`);
  return res.data;
};

export const getTask = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
