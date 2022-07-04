import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "https://nudgelab.jagnani73.com/api/v1/",
});

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const res = await apiClient.post("/admin/login", payload);
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
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
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
  }
};

export const fetchAllProjects = async (token: string) => {
  try {
    const res = await apiClient.get("/project", {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
  }
};

export const getCampaignNudges = async (app_id: string) => {
  try {
    const res = await apiClient.get(`/project/nudges/campaign/${app_id}`);
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
  }
};

export const getTriggerNudges = async (app_id: string) => {
  try {
    const res = await apiClient.get(`/project/nudges/trigger/${app_id}`);
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
  }
};

export const postNudge = async (data: Object, token: string) => {
  try {
    const res = await apiClient.post("/nudge/create", data, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    if ((err as AxiosError).response!) {
      // @ts-ignore
      toast.error(err.response.message);
    } else {
      toast.error("Something went wrong. Check the console for details.");
    }
  }
};
