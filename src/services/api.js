export const fetchMenu = async (restaurantId) => {
  const response = await fetch(
    `http://localhost:8080/api/menu?restaurantId=${restaurantId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Error fetching menu");
  return await response.json();
};

export const fetchMenuByCategory = async (restaurantId, categoryId) => {
  const response = await fetch(
    `http://localhost:8080/api/menu?restaurantId=${restaurantId}&categoryId=${categoryId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Error fetching menu by category");
  return await response.json();
};

export const fetchTopCategories = async (restaurantId) => {
  return null;
};

export const fetchTopDishes = async (restaurantId) => {
  return null;
};

export const fetchValidateToken = async (restaurantId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/validate?restaurantId=${restaurantId}`,
      {
        credentials: "include",
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error validando token", error);
    return false;
  }
};
