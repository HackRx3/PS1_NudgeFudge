const useAuth = () => {
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : undefined;

  return { user };
};

export default useAuth;
