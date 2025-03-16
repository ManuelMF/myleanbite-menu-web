import React, { createContext, useReducer, useContext } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { useLocation } from "react-router-dom";

// Estado inicial
const initialState = {
  menu: null,
  selectedCategory: null,
  order: [],
  selectedProduct: null,
  customizingProduct: null,
  ingredientsProduct: null,
  extrasProduct: null,
  isSubMenuOpen: false,
  showNotification: null,
  isEditingProduct: false,
  tableNumberId: null,
};

// Reducer para manejar acciones
function menuReducer(state, action) {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, menu: action.payload };

    case "UPDATE_PRODUCT_ORDER": {
      if (action.sendMessage)
        action.sendMessage({
          ...action.payload,
          tableNumberId: state.tableNumberId,
          restaurantId: state.menu.restaurantId,
        });

      return {
        ...state,
        order: state.order.map((product) => {
          return product.selectedProduct.orderId ==
            action.payload.selectedProduct.orderId
            ? {
                ...product,
                ingredients: action.payload.ingredients,
                extras: action.payload.extras,
                price: action.payload.price,
              }
            : product;
        }),
        isEditingProduct: false,
      };
    }

    case "ADD_TO_ORDER": {
      if (action.sendMessage)
        action.sendMessage({
          ...action.payload,
          tableNumberId: state.tableNumberId,
          restaurantId: state.menu.restaurantId,
        });

      const updatedOrder = [...state.order, action.payload];

      return { ...state, order: updatedOrder };
    }
    case "REMOVE_FROM_ORDER": {
      if (action.sendMessage)
        action.sendMessage({
          ...action.payload,
          tableNumberId: state.tableNumberId,
          restaurantId: state.menu.restaurantId,
        });

      let order = state.order.filter((product) => {
        if (action.payload.selectedProduct) {
          return (
            product.selectedProduct.orderId !=
            action.payload.selectedProduct.orderId
          );
        } else return product.selectedProduct.orderId != action.payload.orderId;
      });

      return { ...state, order };
    }
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload, isSubMenuOpen: true };
    case "SET_SELECTED_PRODUCT_TO_EDIT":
      return {
        ...state,
        selectedProduct: action.payload,
        ingredientsProduct: action.payload.ingredients,
        extrasProduct: action.payload.extras,
        isSubMenuOpen: true,
        isEditingProduct: true,
      };
    case "CUSTOMIZE_PRODUCT":
      return {
        ...state,
        customizingProduct: action.payload,
        isSubMenuOpen: false,
      };
    case "SAVE_CUSTOMIZATION":
      return {
        ...state,
        selectedProduct: state.customizingProduct,
        ingredientsProduct: action.payload.ingredients,
        extrasProduct: action.payload.extras,
        customizingProduct: null, //Cierra panel
        isSubMenuOpen: true,
      };
    case "CANCEL_CUSTOMIZATION":
      return {
        ...state,
        customizingProduct: null,
        selectedProduct: state.customizingProduct,
        isSubMenuOpen: true,
      };
    case "CLOSE_SUBMENU":
      return {
        ...state,
        selectedProduct: null,
        isSubMenuOpen: false,
        customizingProduct: null,
        ingredientsProduct: null,
        extrasProduct: null,
      };
    case "SHOW_NOTIFICATION":
      return { ...state, showNotification: action.payload };
    case "HIDE_NOTIFICATION":
      return { ...state, showNotification: null };
    case "SET_TABLE_NUMBER_ID":
      return { ...state, tableNumberId: action.payload };
    case "GET_ORDER":
      action.payload.sendOrder({
        order: state.order,
        requesterUuid: action.payload.requesterUuid,
      });
      return state;
    case "SET_ORDER":
      return { ...state, order: action.payload };
    default:
      return state;
  }
}

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const location = useLocation();
  const params = location.pathname.split("/");
  const restaurantId = params[1];
  const tableNumberId = params[2];

  const wsActions = useWebSocket({
    restaurantId,
    tableNumberId,
    dispatch,
    state,
  });

  const addToOrder = (product) => {
    dispatch({
      type: "ADD_TO_ORDER",
      payload: product,
      sendMessage: wsActions.addProduct,
    });
  };

  const updateProductOrder = (product) => {
    dispatch({
      type: "UPDATE_PRODUCT_ORDER",
      payload: product,
      sendMessage: wsActions.updateProductOrder,
    });
  };

  const removeFromOrder = (product) => {
    dispatch({
      type: "REMOVE_FROM_ORDER",
      payload: product,
      sendMessage: wsActions.removeFromOrder,
    });
  };

  // you can call to the dispatch or the actions, the actions will send the request to the other people connected
  const actions = {
    addToOrder,
    updateProductOrder,
    removeFromOrder,
  };

  return (
    <MenuContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
