export interface Order 
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      orderNumber: string;
      userId: string | null;
      user: any | null;
      guestId: string;
      shippingAddressSnapshot: {
        city: string;
        state: string;
        sector: string;
        country: string;
        district: string;
        fullName: string;
        province: string;
        postalCode?: string;
        phoneNumber: string;
        addressLine1: string;
      },
      orderStatus: string;
      paymentStatus: string;
      totalAmount: number;
      shippingCost: number;
      discountAmount: number;
      finalAmount: number;
      notes: null,
      trackingNumber: null,
      estimatedDelivery: null,
      deliveredAt: null
    }
