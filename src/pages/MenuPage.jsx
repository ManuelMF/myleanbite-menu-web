import React, { useState, useEffect } from "react";
import { fetchMenu } from "../services/api";
import Category from "../components/Menu/Category";
import SubMenu from "../components/Menu/SubMenu";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import "./../styles/base.css";
import "./../styles/notification.css";

const MenuPage = () => {
  const [menu, setMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Producto seleccionado
  const [customizingItem, setCustomizingItem] = useState(null); // Personalizando
  const [ingredientsItem, setIngredients] = useState(null); // Personalizando
  const [extrasItem, setExtras] = useState(null); // Personalizando
  const [order, setOrder] = useState([]); // Pedido actual
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para controlar el fondo blanco
  const [showNotification, setShowNotification] = useState(null); // Controla la notificación

  const restaurantId = 2;

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await fetchMenu(restaurantId);
        setMenu(data);
      } catch (error) {
        console.error("Error al cargar el menú", error);
      }
    };
    loadMenu();
  }, [restaurantId]);

  const handleAddToOrder = (item, quantity) => {
    const updatedOrder = [
      ...order,
      { item, quantity, ingredientsItem, extrasItem },
    ];

    setOrder(updatedOrder);
    setSelectedItem(null); // Cierra el submenú
    setIsSubMenuOpen(false); // Cierra el fondo blanco

    const extrasPrice = extrasItem.reduce(
      (act, extra) => act + extra.price * extra.quantity,
      0
    );

    const totalPrice = item.price * quantity + extrasPrice;

    // Muestra la notificación
    setShowNotification(totalPrice);

    setTimeout(() => {
      setShowNotification(null);
    }, 1000);

    setIngredients(null);
    setExtras(null);
  };

  const handleSaveCustomization = (ingredients, extras) => {
    setSelectedItem(customizingItem);
    setIngredients(ingredients);
    setExtras(extras);
    setCustomizingItem(null); // Cierra el panel
  };

  const handleCancelCustomization = () => {
    setSelectedItem(customizingItem);
    setCustomizingItem(null);
  };

  const handleCloseSubMenu = () => {
    setSelectedItem(null); // Cierra el submenu
    setIsSubMenuOpen(false); // Cierra el fondo blanco
    setCustomizingItem(null);
    setIngredients(null);
    setExtras(null);
  };

  const handleCustomize = (item) => {
    setCustomizingItem(item);
    setSelectedItem(null); // Cierra el submenú principal
  };

  if (!menu) return <div className="loading">Cargando menú...</div>;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      {menu.categories.map((category) => (
        <Category
          key={category.posCategoryId}
          category={category}
          onSelectItem={(item) => {
            setSelectedItem(item);
            setIsSubMenuOpen(true); // Abre el submenú principal
          }}
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
