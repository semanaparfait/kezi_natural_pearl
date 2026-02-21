export interface CartItem {
  productId: string;
  quantity: number;       
}

export interface CartItemResponse {
  id: string;
  items: [
    {
      id: string;
      product:{
        id: string;
        image: string;
        name: string;
        stockquantity: number;
      }
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    },
]
}

export interface CheckoutData {
  shippingAddressSnapshot: {
    fullName: string;
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    city: string;
    province: string;
    district: string;
    sector: string;
    addressLine1: string;
    postalCode?: string;
  };
  saveAddress?: boolean; 
  phoneNumber: string;
}