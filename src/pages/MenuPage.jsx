import React, { useState, useEffect } from "react";
import { fetchMenu } from "../services/api";
import Category from "../components/Menu/Category";
import SubMenu from "../components/Menu/SubMenu";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import "./../styles/base.css";
import "./../styles/notification.css";
import { useMenu } from "../context/MenuContext";

const MenuPage = () => {
  const { state, dispatch } = useMenu();
  const {
    menu,
    order,
    selectedItem,
    customizingItem,
    ingredientsItem,
    extrasItem,
    isSubMenuOpen,
    showNotification,
  } = state;

  const restaurantId = 2;

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(restaurantId);
        dispatch({ type: "SET_MENU", payload: data });
      } catch (error) {
        console.error("Error al cargar el menú", error);
      }
    };
    loadMenu();
  }, [restaurantId]);

  const handleAddToOrder = (item, quantity) => {
    const extrasPrice = (state.extrasItem || []).reduce(
      (acc, extra) => acc + extra.price * extra.quantity,
      0
    );
    const totalPrice = item.price * quantity + extrasPrice;

    dispatch({
      type: "ADD_TO_ORDER",
      payload: {
        item,
        quantity,
        ingredients: state.ingredientsItem,
        extras: state.extrasItem,
      },
    });

    dispatch({ type: "SHOW_NOTIFICATION", payload: totalPrice });

    setTimeout(() => dispatch({ type: "HIDE_NOTIFICATION" }), 1000);

    dispatch({ type: "CLOSE_SUBMENU" });
  };

  const handleSaveCustomization = (ingredients, extras) => {
    dispatch({ type: "SAVE_CUSTOMIZATION", payload: { ingredients, extras } });
  };

  const handleCancelCustomization = () => {
    dispatch({ type: "CANCEL_CUSTOMIZATION" });
  };

  const handleOpenSubmenu = (item) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: item });
  };

  const handleCloseSubMenu = () => {
    dispatch({ type: "CLOSE_SUBMENU" });
  };

  const handleCustomize = (item) => {
    dispatch({ type: "CUSTOMIZE_ITEM", payload: item });
  };

  if (!menu) return <div className="loading">Cargando menú...</div>;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      {menu.categories.map((category) => (
        <Category
          key={category.posCategoryId}
          category={category}
          onSelectItem={(item) => handleOpenSubmenu(item)}
        />
      ))}

      {/* Fondo blanco cuando el submenu está abierto */}
      {isSubMenuOpen && (
        <div className="submenu-overlay" onClick={handleCloseSubMenu}></div>
      )}

      {/* Submenu principal */}
      {selectedItem && (
        <SubMenu
          item={selectedItem}
          extras={extrasItem}
          ingredients={ingredientsItem}
          onClose={handleCloseSubMenu}
          onCustomize={() => handleCustomize(selectedItem)} // Abre el submenú de personalización
          onAddToOrder={handleAddToOrder}
        />
      )}

      {/* Submenú de personalización */}
      {customizingItem && (
        <CustomizeMenu
          item={customizingItem}
          ingredients={ingredientsItem}
          extras={extrasItem}
          onClose={handleCancelCustomization} // Cierra el submenú de personalización
          onSave={handleSaveCustomization}
        />
      )}

      <OrderSummary order={order} />

      {/* Notificación de pantalla completa */}
      {showNotification && (
        <div className="notification-overlay">
          <div className="notification-message">
            <img
              src="/notification-image.gif" // Use the path relative to the public folder
              alt="Item añadido"
              className="notification-image"
            />
            <div className="notification-text">
              <h2>¡Artículo añadido a tu pedido!</h2>
              <p>Tu total se ha actualizado</p>
              <p>{showNotification.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
