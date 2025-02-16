import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchValidateToken } from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      if (!restaurantId) {
        navigate("/unauthorized");
        return;
      }
      const valid = await fetchValidateToken(restaurantId);
      setIsAuthenticated(valid);
      if (!valid) navigate("/unauthorized");
    };

    checkAuth();
  }, [navigate, restaurantId]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
