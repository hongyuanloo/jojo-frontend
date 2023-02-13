// products related
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  isFeatured: boolean;
  categories: TCategory[];
  images: string[];
  [index: string]: any;
}

export type TCategory =
  | "Clothes"
  | "Electronics"
  | "Furniture"
  | "Shoes"
  | "Others";
