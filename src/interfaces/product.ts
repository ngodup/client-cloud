export type ProductProperties =
  | "category"
  | "repas"
  | "repasType"
  | "price"
  | "name";

export interface Product {
  id?: number;
  name: string;
  imageName: string;
  price: number;
  repas: string;
  category: string;
  repasType: string;
  reviews?: string;
  active?: boolean;
  rating?: number;
  description?: string;
}
