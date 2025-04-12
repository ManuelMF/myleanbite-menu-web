import { useMenu } from "../../context/MenuContext";

const Notificacion = () => {
  const { state } = useMenu();
  const { showNotificationPushOrder } = state;

  if (!showNotificationPushOrder) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-message">
        <img
          src="/notification-image.gif" // Use the path relative to the public folder
          alt="Item añadido"
          className="notification-image"
        />
        <div className="notification-text">
          <h2>¡Pedido finalizado con exito!</h2>
          <p>En breves recibira su comida</p>
        </div>
      </div>
    </div>
  );
};

export default Notificacion;
