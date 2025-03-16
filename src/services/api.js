export const fetchMenu = async (restaurantId, tableNumberId) => {
  const response = await fetch(
    `http://localhost:8080/api/menu?restaurantId=${restaurantId}&tableNumberId=${tableNumberId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Error fetching menu");
  return await response.json();
};

export const fetchMenuByCategory = async (
  restaurantId,
  categoryId,
  tableNumberId
) => {
  const response = await fetch(
    `http://localhost:8080/api/menu?restaurantId=${restaurantId}&categoryId=${categoryId}&tableNumberId=${tableNumberId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Error fetching menu by category");
  return await response.json();
};

export const fetchTopCategoriesAndProducts = async (
  restaurantId,
  numberProducts,
  numberCategories,
  tableNumberId
) => {
  const response = await fetch(
    `http://localhost:8080/api/menu/top-categories-products?restaurantId=${restaurantId}&numberOfProducts=${numberProducts}&numberOfCategories=${numberCategories}&tableNumberId=${tableNumberId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok)
    throw new Error("Error fetching Top Categories And Products");
  return await response.json();
};

export const fetchValidateToken = async (restaurantId, tableNumberId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/validate?restaurantId=${restaurantId}&tableNumberId=${tableNumberId}`,
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
