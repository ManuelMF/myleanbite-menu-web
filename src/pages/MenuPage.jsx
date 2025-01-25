import React, { useEffect } from "react";
import { useMenu } from "../context/MenuContext";
import { fetchMenu } from "../services/api";
import MenuCategoryList from "../components/Menu/MenuCategoryList";
import SubMenuWrapper from "../components/Menu/SubMenuWrapper";
import CustomizeMenu from "../components/Menu/CustomizeMenu";
import OrderSummary from "../components/Menu/OrderSummary";
import Notification from "../components/Menu/Notification";
import Loading from "../components/Layout/Loading";

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

  if (!menu) return <Loading />;

  return (
    <div className="menu-page">
      <h1 className="menu-title">{`Menú del Restaurante ${menu.restaurantId}`}</h1>
      <MenuCategoryList
        categories={menu.categories}
        onSelectCategory={handleOpenSubmenu}
      />
      <SubMenuWrapper
        isSubMenuOpen={isSubMenuOpen}
        selectedItem={selectedItem}
        extrasItem={extrasItem}
        ingredientsItem={ingredientsItem}
        onClose={handleCloseSubMenu}
        onCustomize={() => handleCustomize(selectedItem)}
        onAddToOrder={handleAddToOrder}
      />
      <CustomizeMenu
        item={customizingItem}
        ingredients={ingredientsItem}
        extras={extrasItem}
        onClose={handleCancelCustomization}
        onSave={handleSaveCustomization}
      />
      <OrderSummary order={order} />

      <Notification showNotification={showNotification} />
    </div>
  );
};

export default MenuPage;
