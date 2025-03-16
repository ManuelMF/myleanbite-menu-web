import { useEffect } from "react";
import { fetchMenu } from "../services/api";
import { useMenu } from "../context/MenuContext";

export const useLoadMenu = (restaurantId, tableNumberId) => {
  const { dispatch } = useMenu();
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(restaurantId, tableNumberId);
        dispatch({ type: "SET_TABLE_NUMBER_ID", payload: tableNumberId });
        dispatch({ type: "SET_MENU", payload: data });
      } catch (error) {
        console.error("Error al cargar el menú", error);
      }
    };
    loadMenu();
  }, [restaurantId]);
};
