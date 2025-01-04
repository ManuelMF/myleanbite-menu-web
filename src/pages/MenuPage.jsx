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
  };

  const handleSaveCustomization = (ingredients) => {
    console.log("Ingredientes seleccionados:", ingredients);
    setCustomizingItem(null);
  };

  if (!menu) return <div className="loading">Cargando menú...</div>;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      {menu.categories.map((category) => (
        <Category
          key={category.posCategoryId}
          category={category}
          onSelectItem={setSelectedItem}
        />
      ))}

      {selectedItem && (
        <SubMenu
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onCustomize={() => {
            setCustomizingItem(selectedItem);
            setSelectedItem(null);
          }}
          onAddToOrder={handleAddToOrder}
        />
      )}

      {customizingItem && (
        <CustomizeMenu
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onSave={handleSaveCustomization}
        />
      )}

      <OrderSummary order={order} />
    </div>
  );
};

export default MenuPage;
