import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, postData, updateData, deleteData }  from "../utils/ApiUtils";
import { useLoader } from "../utils/LoaderManager";


export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const token = localStorage.getItem('authResponse');
    if (token === null) {
      hideLoader(false);
      router('/');
    }
    const checkTokenValidity = async () => {
      try {
        const response = await fetchData(
          "profile",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response) {
          setIsAuthenticated(true);
        }
        else {
          localStorage.removeItem('authResponse');
          router('/');
        }
      } catch (error) {
        localStorage.removeItem('authResponse');
        router('/');
      } finally {
        setLoading(false);
        hideLoader(false);
      }
    };

    checkTokenValidity();
  }, [router]);

  if (loading) return <div></div>;

  return <>{isAuthenticated && children}</>;
}
