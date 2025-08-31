import { useEffect, useState } from "react";
import getRestaurantRequest from "../services/getRestaurant.service";

export function useRestaurant(restaurantId) {
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = await getRestaurantRequest(restaurantId);
      setRestaurant(data);
    };
    fetchRestaurant();
  }, [restaurantId]);

  return restaurant;
}
