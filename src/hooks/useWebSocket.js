import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import {
  generateUniqueId,
  getHubBaseUrl,
  getWebSocketProtocol,
} from "../utils";

const useWebSocket = ({ restaurantId, tableNumberId, dispatch }) => {
  const [uuid, setUuid] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    setUuid(generateUniqueId());
  }, []);

  useEffect(() => {
    if (!restaurantId || !tableNumberId || !uuid) return;
    const stompClient = new Client({
      brokerURL: `${getWebSocketProtocol()}://${getHubBaseUrl()}/ws`,
      //debug: (msg) => console.log("🐛 WebSocket Debug:", msg),
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

            // Ask the order of the other cliens
            if (orderUpdate.type === "GET_ORDER" && orderUpdate.uuid !== uuid) {
              dispatch({
                type: "GET_ORDER",
                payload: { sendOrder, requesterUuid: orderUpdate.uuid },
              });
            } else if (
              // Send the order of the other clients
              orderUpdate.type === "SEND_ORDER" &&
              orderUpdate.requesterUuid === uuid
            ) {
              dispatch({ type: "SET_ORDER", payload: orderUpdate.order });
            } else if (
              orderUpdate.uuid !== uuid &&
              orderUpdate.type === "DELETE_ORDER"
            ) {
              // specific case to can manage the set Timeout to hide the notification order
              setTimeout(
                () => dispatch({ type: "HIDE_NOTIFICATION_PUSH_ORDER" }),
                3000
              );
              dispatch({ type: orderUpdate.type, payload: orderUpdate });
            } else if (orderUpdate.uuid !== uuid) {
              dispatch({ type: orderUpdate.type, payload: orderUpdate });
            }
          }
        );
      },
      onStompError: (error) => console.error("WebSocket Error:", error),
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => stompClient.deactivate();
  }, [restaurantId, tableNumberId, uuid]);

  const sendMessage = (destination, body) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.error("WebSocket not connected");
      return;
    }

    clientRef.current.publish({
      destination,
      body: JSON.stringify({ ...body, uuid }),
    });
  };

  const addProduct = (order) => {
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/addProduct`,
      { ...order, type: "ADD_TO_ORDER" }
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
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/sendOrder`,
      { order, requesterUuid, type: "SEND_ORDER" }
    );
  };

  //when we post an order we only want post one time for the rest of the people we delete the order
  const deleteOrder = () =>
    sendMessage(
      `/app/restaurant/${restaurantId}/table/${tableNumberId}/deleteOrder`,
      { type: "DELETE_ORDER" }
    );

  return {
    addProduct,
    updateProductOrder,
    removeFromOrder,
    sendOrder,
    deleteOrder,
  };
};

export default useWebSocket;
