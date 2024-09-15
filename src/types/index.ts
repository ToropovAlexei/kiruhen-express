export interface Sneaker {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export interface CartItem {
  id: number;
  sneaker_id: number;
  quantity: number;
}

export interface FavoriteItem {
  id: number;
  sneaker_id: number;
}
