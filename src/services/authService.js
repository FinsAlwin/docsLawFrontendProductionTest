import axios from "axios";
import Cookies from "js-cookie";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`/api/User/login`, { username, password });
    const { token, user, folder } = response.data;

    Cookies.set("token", token, { expires: 3 });
    Cookies.set("user", JSON.stringify(user), { expires: 3 });
    Cookies.set("folder", JSON.stringify(folder), { expires: 3 });

    return { token, user, folder, status: response.status, statusText: response.statusText };
  } catch (error) {
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      return false; // No token available
    }

    const response = await axios.get("/api/User/validateToken", {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token as a bearer token in the request headers
      },
    });

    return response.status === 200; // Return true if the response status is 200
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("folder");
  return true;
};
