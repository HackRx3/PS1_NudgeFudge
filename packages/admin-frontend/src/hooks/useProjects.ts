import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../services/api";
import { RootState } from "../store";
import { setProjects } from "../store/projects.slice";
import useAuth from "./useAuth";

const useProjects = () => {
  const auth = useAuth();

  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    if (!auth.isLoggedIn) return;
    fetchAllProjects(auth.user?.token!).then((res) => {
      if (res.data && Array.isArray(res.data)) {
        dispatch(setProjects(res.data));
      }
    });
  }, []);

  return { data: projects };
};

export default useProjects;
