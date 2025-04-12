import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const LogoutContext = createContext();

export const LogoutProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  return (
    <LogoutContext.Provider value={{ handleLogout }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => useContext(LogoutContext);
