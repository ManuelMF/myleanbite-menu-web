import React, { createContext, useReducer, useContext } from "react";

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
};

// Reducer para manejar acciones
function menuReducer(state, action) {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, menu: action.payload };
    case "ADD_TO_ORDER":
      return { ...state, order: [...state.order, action.payload] };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload, isSubMenuOpen: true };
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
    default:
      return state;
  }
}

// Crear el contexto
const MenuContext = createContext();

// Proveedor del contexto
export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook para usar el contexto
export const useMenu = () => useContext(MenuContext);
