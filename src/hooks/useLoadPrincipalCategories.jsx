import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { fetchTopCategories } from "../services/api";

export const useLoadMoreRequestedCategories = () => {
  const { state } = useMenu();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = state.menu.restaurantId;

  useEffect(() => {
    const loadMoreRequestedCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        setCategories(state.menu.categories.slice(0, 4));
        //const data = await fetchTopCategories(restaurantId);
        // setCategories(data);
      } catch (error) {
        console.error('Error fetching "loadMoreRequestedCategories"', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreRequestedCategories();
  }, [restaurantId]);

  return { categories, loading, error };
};
