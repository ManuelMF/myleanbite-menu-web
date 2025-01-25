import React, { createContext, useReducer, useContext } from "react";

// Estado inicial
const initialState = {
  menu: null,
  order: [],
  selectedItem: null,
  customizingItem: null,
  ingredientsItem: null,
  extrasItem: null,
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
    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.payload, isSubMenuOpen: true };
    case "CUSTOMIZE_ITEM":
      return {
        ...state,
        customizingItem: action.payload,
        isSubMenuOpen: false,
      };
    case "SAVE_CUSTOMIZATION":
      return {
        ...state,
        selectedItem: state.customizingItem,
        ingredientsItem: action.payload.ingredients,
        extrasItem: action.payload.extras,
        customizingItem: null, //Cierra panel
        isSubMenuOpen: true,
      };
    case "CANCEL_CUSTOMIZATION":
      return {
        ...state,
        customizingItem: null,
        selectedItem: state.customizingItem,
        isSubMenuOpen: true,
      };
    case "CLOSE_SUBMENU":
      return {
        ...state,
        selectedItem: null,
        isSubMenuOpen: false,
        customizingItem: null,
        ingredientsItem: null,
        extrasItem: null,
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
