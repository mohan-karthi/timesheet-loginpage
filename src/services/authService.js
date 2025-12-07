import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/login/";

export const login = async (employeeId, password) => {
  try {
    const response = await axios.post(API_URL, {
      employee_id: employeeId,
      password: password,
    });

    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
