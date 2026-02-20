import api from "./axios";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.accessToken);
  return res.data;
};

export const register = async (data) => {
  return api.post("/auth/register", data);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProfile = () => {
  return api.get("/auth/profile");
};
