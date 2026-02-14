import { api } from "./api";

export const getTodos = async (page = 1) => {
  const res = await api.get(`/todos?page=${page}&limit=10`);
  return res.data;
};

export const getTodo = async (id) => {
  const res = await api.get(`/todos/${id}`);
  return res.data;
};

export const createTodo = async (data) => {
  const res = await api.post("/todos", data);
  return res.data;
};

export const updateTodo = async (id, data) => {
  const res = await api.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};
