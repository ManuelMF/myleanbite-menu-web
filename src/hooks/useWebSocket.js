import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { generateUniqueId } from "../utils";

const useWebSocket = ({ restaurantId, tableNumberId, dispatch, state }) => {
  const [client, setClient] = useState(null);
  const [uuid, setUuid] = useState();

  useEffect(() => {
    setUuid(generateUniqueId());
  }, []);

  useEffect(() => {
    if (!restaurantId || !tableNumberId) return;
    console.log("🚀 ~ useEffect ~ restaurantId:", restaurantId);

    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: (msg) => console.log("🐛 WebSocket Debug:", msg),
      onConnect: () => {
        console.log(
          `Connected to WebSocket: Restaurant ${restaurantId}, Table ${tableNumberId}, uuid ${uuid}`
        );

        stompClient.publish({
          destination: `/app/restaurant/${restaurantId}/table/${tableNumberId}/getOrder`,
          body: JSON.stringify({ type: "GET_ORDER", uuid }),
        });

        stompClient.subscribe(
          `/topic/restaurant/${restaurantId}/table/${tableNumberId}`,
          (message) => {
            const orderUpdate = JSON.parse(message.body);

            if (orderUpdate.type == "GET_ORDER" && orderUpdate.uuid !== uuid) {
              console.log("🚀 ~ useEffect ~ orderUpdate:", orderUpdate);
              sendOrder({
                order: state.order,
                requesterUuid: orderUpdate.uuid,
              });
            } else if (orderUpdate.type == "SEND_ORDER") {
              console.log("🚀 ~ send:", orderUpdate);
            } else if (orderUpdate.uuid !== uuid) {
              dispatch({ type: orderUpdate.type, payload: orderUpdate });
            }
          }
        );
      },
      onStompError: (error) => console.error("WebSocket Error:", error),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, [restaurantId, tableNumberId, uuid]);

  const sendMessage = (destination, body) => {
    if (client) {
      client.publish({ destination, body: JSON.stringify({ ...body, uuid }) });
    }
  };

  const addProduct = (order) => {
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/addProduct`,
      { ...order, type: "ADD_TO_ORDER" }
    );
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/sendOrder`,
      { ...order, requesterUuid: 22424, type: "SEND_ORDER" }
    );
  };

  const updateProductOrder = (updatedOrder) =>
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/updateProduct`,
      { ...updatedOrder, type: "UPDATE_PRODUCT_ORDER" }
    );

  const removeFromOrder = (product) =>
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/removeProduct`,
      { selectedProduct: product, type: "REMOVE_FROM_ORDER" }
    );

  const sendOrder = ({ order, requesterUuid }) => {
    console.log("🚀 ~ sendOrder ~ requesterUuid:", requesterUuid);
    if (!client || !client.connected) {
      console.error(
        "❌ WebSocket no está conectado. No se puede enviar mensaje."
      );
      return;
    }
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/sendOrder`,
      { ...order, requesterUuid, type: "SEND_ORDER" }
    );
  };
  return { addProduct, updateProductOrder, removeFromOrder, sendOrder };
};

export default useWebSocket;
