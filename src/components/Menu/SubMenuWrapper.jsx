import SubMenu from "../Menu/SubMenu";
import { useMenu } from "../../context/MenuContext";

const SubMenuWrapper = () => {
  const { state, dispatch } = useMenu();
  if (!state.selectedProduct) return null;

  /* Fondo blanco cuando el submenu está abierto */
  return (
    <>
      {(state.isSubMenuOpen || state.customizingProduct) && (
        <div
          className="submenu-overlay"
          onClick={() => dispatch({ type: "CLOSE_SUBMENU" })}
        />
      )}
      <SubMenu />
    </>
  );
};

export default SubMenuWrapper;
