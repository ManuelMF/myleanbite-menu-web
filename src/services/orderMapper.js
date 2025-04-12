export function mapToOrderDTO({ order, totalAmount, tableNumberId }) {
  return {
    orderDetails: mapToOrderDetailDTO(order),
    totalAmount: totalAmount,
    tableNumber: tableNumberId + "",
  };
}

function mapToOrderDetailDTO(orderDetails) {
  return orderDetails.map((order) => {
    return {
      productId: order.selectedProduct.id,
      orderId: null,
      posId: order.selectedProduct.posId,
      categoryId: null,
      quantity: order.quantity,
      unitPrice: order.selectedProduct.price,
      subtotal: order.quantity * order.selectedProduct.price,
      notes: null,
      extras: mapToExtrasDTO(order.extras),
      ingredients: mapToIngredientsDTO(order.ingredients),
    };
  });
}

function mapToExtrasDTO(extras) {
  return (
    extras?.map((extra) => {
      return {
        id: null,
        extraId: extra.id,
        name: extra.name,
        quantity: extra.quantity,
        unitPrice: Number(extra.price),
        subtotal: (extra.quantity * extra.price).toFixed(2),
      };
    }) || []
  );
}

function mapToIngredientsDTO(ingredients) {
  return (
    ingredients?.map((ingredient) => {
      return {
        id: null,
        ingredientId: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
      };
    }) || []
  );
}
