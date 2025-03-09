import { useState, useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { fetchTopCategoriesAndProducts } from "../services/api";
import { useParams } from "react-router-dom";

export const useLoadPrincipalCategoriesAndProducts = () => {
  const { state } = useMenu();
  const [topCategories, setTopCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restaurantId = state.menu.restaurantId;
  const { tableNumberId } = useParams();
  useEffect(() => {
    const loadMoreRequestedCategories = async () => {
      setLoading(true);
      setError(null);
      const numberOfProducts = 3,
        numberOfCategories = 4;

      try {
        const data = await fetchTopCategoriesAndProducts(
          restaurantId,
          numberOfProducts,
          numberOfCategories,
          tableNumberId
        );
        const topCategoriesObj = [];
        const topProductsObj = [];
        state.menu.categories.map((category) => {
          if (data.topCategories.includes(category.id + "")) {
            topCategoriesObj.push(category);
          }

          category.products.map((product) => {
            if (data.topProducts.includes(product.posId)) {
              topProductsObj.push(product);
            }
          });
        });

        setTopCategories(topCategoriesObj);
        setTopProducts(topProductsObj);
      } catch (error) {
        console.error('Error fetching "loadMoreRequestedCategories"', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreRequestedCategories();
  }, [restaurantId]);

  return { topCategories, topProducts, loading, error };
};
