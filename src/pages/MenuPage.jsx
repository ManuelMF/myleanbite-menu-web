import React, { useState, useEffect } from "react";
import { fetchMenu } from "../services/api";
import Category from "../components/Menu/Category";
import SubMenu from "../components/Menu/SubMenu";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import './../styles/globals.css';

const MenuPage = () => {
  const [menu, setMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Producto seleccionado
  const [customizingItem, setCustomizingItem] = useState(null); // Personalizando
  const [order, setOrder] = useState([]); // Pedido actual
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para controlar el fondo blanco

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
    const updatedOrder = [...order, { item, quantity }];
    setOrder(updatedOrder);
    setSelectedItem(null); // Cierra el submenú
    setIsSubMenuOpen(false); // Cierra el fondo blanco
  };

  const handleSaveCustomization = (ingredients) => {
    console.log("Ingredientes seleccionados:", ingredients);
    setCustomizingItem(null);
    setIsSubMenuOpen(false); // Cierra el fondo blanco después de personalizar
  };

  const handleCloseSubMenu = () => {
    setSelectedItem(null); // Cierra el submenu
    setIsSubMenuOpen(false); // Cierra el fondo blanco
  };

  const handleCustomize = (item) => {
    setCustomizingItem(item);
    setSelectedItem(null); // Cierra el submenú principal
    setIsSubMenuOpen(false); // Cierra el fondo blanco cuando empieza la personalización
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
      {isSubMenuOpen && <div className="submenu-overlay" onClick={handleCloseSubMenu}></div>}

      {/* Submenu principal */}
      {selectedItem && (
        <SubMenu
          item={selectedItem}
          onClose={handleCloseSubMenu}
          onCustomize={() => handleCustomize(selectedItem)} // Abre el submenú de personalización
          onAddToOrder={handleAddToOrder}
        />
      )}

      {/* Submenú de personalización */}
      {customizingItem && (
        <CustomizeMenu
          item={customizingItem}
          onClose={() => setCustomizingItem(null)} // Cierra el submenú de personalización
          onSave={handleSaveCustomization}
        />
      )}

      <OrderSummary order={order} />
    </div>
  );
};

export default MenuPage;
