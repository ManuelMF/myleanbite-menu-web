import { useMenu } from "../../context/MenuContext";

const Notificacion = () => {
  const { state } = useMenu();
  const { showNotification } = state;

  if (!showNotification) return null;

  return (
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
  );
};

export default Notificacion;
