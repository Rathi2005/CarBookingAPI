import { createContext, useContext, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getToken, setToken, removeToken } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());

  const user = useMemo(() => {
    if (!token) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }, [token]);

  function login(userToken) {
    setToken(userToken);
    setTokenState(userToken);
  }

  function logout() {
    removeToken();
    setTokenState(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}