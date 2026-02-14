export interface CartItem {
  productId: string;
  quantity: number;       
}

export interface CartItemResponse {
  id: string;
  items: [
    {
      id: string;
      image: string;
      product: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    },
]
}