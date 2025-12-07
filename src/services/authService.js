// src/services/authService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/";

/** login returns backend JSON {status, access, refresh, role} */
export async function login(employee_id, password) {
  const res = await axios.post(`${API_BASE}login/`, { employee_id, password });
  return res.data;
}

export function setAuthHeader(token) {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("role");
  setAuthHeader(null);
}
