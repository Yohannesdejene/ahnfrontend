import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getSessionKey, setSessionKey } from "@/utils/sessionManager";
interface User {
  token: string;
}

interface AuthContextType {
  user: User | null;
  //   login: (token: string) => void;
  //   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface SetSessionKeyParams {
  userToken: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = getSessionKey();
    if (token) {
      setUser({ token });
    }
  }, []);
  //   const login = (token: SetSessionKeyParams) => {
  //     // setUser({ token });
  //     setSessionKey(token);
  //     // localStorage.setItem("token", token);
  //   };

  //   const logout = () => {
  //     setUser(null);
  //     localStorage.removeItem("token");
  //   };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
