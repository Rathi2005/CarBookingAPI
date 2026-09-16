import { createContext, useContext, useState } from "react";

import { storage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());

  const [token, setToken] = useState(storage.getToken());

  const login = (data) => {
    storage.setToken(data.token);

    storage.setUser(data.user);

    setToken(data.token);

    setUser(data.user);
  };

  const logout = () => {
    storage.clear();

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
