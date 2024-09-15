export interface Sneaker {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  sneaker_id: number;
  quantity: number;
}
