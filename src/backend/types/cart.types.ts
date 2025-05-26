export interface ProductDetails {
  productId: string;
  name: string;
  price: number; 
  imageUrl: string;
}

export interface CartItem extends ProductDetails {
  quantity: number;
  itemTotal: number;
}

export interface GuestCartStorage {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;     name: string;
    imageUrl: string;
  }>;
  createdAt: string; 
  updatedAt: string; 
}

export interface CartData {
  cartId: string; 
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}


export type CartContext = {
  type: "guest";
  id: string;
};
