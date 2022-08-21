import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("Auth-------------");
  const [user, setUser] = useLocalStorage("user", null);
  // const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const loginFun = async (data) => {
    setUser(data);
    // navigate("/homepage");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    // navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      loginFun,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};