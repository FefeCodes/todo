import { api } from "./api";

// GET /tasks - List all todos with pagination
export const getTasks = async (page = 1) => {
  const response = await api.get(`/tasks?page=${page}&limit=10`);
  return response.data; // API returns { data: [...], meta: {...} }
};

// GET /tasks/:id - Get a single todo
export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

// DELETE /tasks/:id - Remove a task
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
