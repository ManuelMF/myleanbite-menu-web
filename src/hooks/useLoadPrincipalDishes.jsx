import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { fetchTopDishes } from "../services/api";

export const useLoadPrincipalDishes = () => {
  const { state } = useMenu();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = state.menu.restaurantId;

  useEffect(() => {
    const loadPrincipalDishes = async () => {
      setLoading(true);
      setError(null);

      try {
        setDishes(state.menu.categories[1].products.slice(0, 3));
        //const data = await fetchTopDishes(restaurantId);
        // setDishes(data);
      } catch (error) {
        console.error('Error fetching "loadPrincipalDishes"', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadPrincipalDishes();
  }, [restaurantId]);

  return { dishes, loading, error };
};
