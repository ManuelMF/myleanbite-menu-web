import SubMenu from "../Menu/SubMenu";

const SubMenuWrapper = ({
  isSubMenuOpen,
  selectedItem,
  extrasItem,
  ingredientsItem,
  onClose,
  onCustomize,
  onAddToOrder,
}) => {
  if (!selectedItem) return null;

  /* Fondo blanco cuando el submenu está abierto */
  return (
    <>
      {isSubMenuOpen && (
        <div className="submenu-overlay" onClick={onClose}></div>
      )}
      <SubMenu
        item={selectedItem}
        extras={extrasItem}
        ingredients={ingredientsItem}
        onClose={onClose}
        onCustomize={onCustomize}
        onAddToOrder={onAddToOrder}
      />
    </>
  );
};

export default SubMenuWrapper;
