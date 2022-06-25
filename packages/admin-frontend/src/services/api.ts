import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const res = await apiClient.post("/admin/login", payload);
    return res.data;
  } catch (err) {
    toast.error("Something went wrong. Check the console for details.");
  }
};

export const createProject = async (
  name: string,
  platform: string,
  token: string
) => {
  try {
    const res = await apiClient.post(
      "/project/create",
      { name, platform },
      { headers: { authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    toast.error("Something went wrong. Check the console for details.");
  }
};

export const fetchAllProjects = async (token: string) => {
  try {
    const res = await apiClient.get("/project", {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    toast.error("Something went wrong. Check the console for details.");
  }
};
