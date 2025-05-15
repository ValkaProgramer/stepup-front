import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: Date.now() / 1000 <= jwtDecode<{exp:number}>(token)?.exp };
};

export default useAuth;
