import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.url?.includes("/auth/status")) {
      return Promise.reject(error);
    }
    const data = error.response?.data;

    if (data?.errors) {
      Object.values(data.errors)
        .flat()
        .forEach((msg) => toast.error(msg));
      return Promise.reject(error);
    }

    const serverMessage = data?.detail || data?.message || data?.title;

    if (typeof data === "string" && data.trim().length > 0) {
      toast.error(data);
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      toast.error(serverMessage || "Сессия истекла или неверные учётные данные");
    } else if (serverMessage) {
      toast.error(serverMessage);
    } else {
      toast.error("Не удалось связаться с сервером");
    }

    return Promise.reject(error);
  }
);

export const todoService = {
  getAll: async (folder) => {
    const currentDateTime = new Date().toISOString();

    const response = await api.get("/todos", {
      params: {
        folder: folder,
        dateTime: currentDateTime
      }
    });
    return response.data;
  },
  create: async (todoDto) => {
    const response = await api.post('/todos', todoDto );
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/todos/${id}`);
  },
  update: async (id, todoDto) => {
    const response = await api.put(`/todos/${id}`, todoDto)
    return response.data;
  },
  complete: async (id) => {
    await api.put(`/todos/${id}/complete`)
  },
  uncomplete: async (id) => {
    await api.put(`/todos/${id}/uncomplete`)
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

export const tagsService = {
  getAll: async () => {
    const response = await api.get("/tags");
    return response.data;
  },
  get: async (id) => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  },
  create: async (tagDto) => {
    const response = await api.post("/tags", tagDto);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  }
}