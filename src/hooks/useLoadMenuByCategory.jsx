import { useEffect } from "react";
import { fetchMenuByCategory } from "../services/api";
import { useMenu } from "../context/MenuContext";

export const useLoadMenuByCategory = (restaurantId, categoryId) => {
  const { dispatch, status } = useMenu();
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenuByCategory(restaurantId, categoryId);
        dispatch({ type: "SET_MENU", payload: data });
      } catch (error) {
        console.error("Error loading the menu by category", error);
      }
    };
    loadMenu();
  }, [status, categoryId]);
};
