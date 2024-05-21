export interface ShoppingCartProduct {
  id: number;
  name: string;
  imageName: string;
  price: number;
  quantity: number;
}

export interface ShoppingCartProductWithoutImage {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ShoppingCartState {
  status: string;
  paymentMethod: string;
  total_price: number;
  products: ShoppingCartProduct[] | ShoppingCartProductWithoutImage[];
}
