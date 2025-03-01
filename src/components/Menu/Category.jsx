import React from "react";
import "../../styles/menu/submenu.css";
import { useMenu } from "../../context/MenuContext";

const Category = ({ category }) => {
  const { dispatch } = useMenu();

  const handleOpenSubmenu = (product) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
  };
  return (
    <div className="category">
      <h2 className="category-title">{category.name}</h2>
      <div className="category-products">
        {category.products.map((product) => (
          <div
            key={product.id}
            className="menu-product"
            onClick={() => handleOpenSubmenu(product)}
          >
            <span className="product-name">{product.name}</span>
            <span className="product-price">{product.price.toFixed(2)} €</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
