import { useState } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (token) => {
    const decoded = jwtDecode(token); // { id, role, iat, exp }

    const userData = {
      id: decoded.id,
      username:decoded.username,
      role: decoded.role,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
