export type ProductProperties =
  | "category"
  | "repas"
  | "repasType"
  | "price"
  | "name";

export interface Product {
  id?: number;
  name: string;
  price: number;
  imageName: string;
  repas: string;
  category: string;
  repasType: string;
  reviews?: string;
  active?: boolean;
  rating?: string;
}
