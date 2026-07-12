import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7236/api',
  withCredentials: true,
});



// Объект с методами для конкретных сущностей (как репозиторий в C#)
export const todoService = {
  getAll: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  create: async (title) => {
    const response = await api.post('/todos', { title });
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/todos/${id}`);
  }
};

export const authService = {
    login: async (loginDto) => {
        const response = await api.post("/auth/login", loginDto);
        return response.data; 
    },
    register: async (loginDto) => {
        const response = await api.post("/auth/register", loginDto);
        return response.data;
    },
    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },
    getStatus: async () => {
        const response = await api.get("/auth/status");
        return response.data;
    }
}