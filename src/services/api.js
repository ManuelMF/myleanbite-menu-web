export const fetchMenu = async (restaurantId) => {
  const response = await fetch(
    `http://localhost:8080/api/menu/${restaurantId}`
  );
  if (!response.ok) throw new Error("Error fetching menu");
  return await response.json();
};

export const fetchTopCategories = async (restaurantId) => {
  return null;
};

export const fetchTopDishes = async (restaurantId) => {
  return null;
};
