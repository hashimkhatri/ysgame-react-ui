import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoggedInRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authResponse");
    if (token !== null) {
      setIsAuthenticated(true);
      router("/lobby");
    }
  }, []);

  if (isAuthenticated) return <div></div>;

  return <>{children}</>;
}
