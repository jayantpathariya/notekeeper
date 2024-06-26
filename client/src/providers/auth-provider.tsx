import axios from "axios";
import { Loader2 } from "lucide-react";
import { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  checkAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get("/api/auth/me");
      setUser(response.data);

      if (
        (location.pathname === "/login" || location.pathname === "/register") &&
        response.data
      ) {
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          setUser(null);
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="bg-light dark:bg-dark text-on-light dark:text-on-dark min-h-screen flex flex-col gap-y-2 items-center justify-center">
        <Loader2 className="animate-spin size-12" />
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
