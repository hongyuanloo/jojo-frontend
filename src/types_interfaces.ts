// product type
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

// cart type
export interface ICartItem {
  quantity: number;
  product: IProduct;
  userId: string;
  [index: string]: any;
}

// product categories type
export type TCategory =
  | "Clothes"
  | "Electronics"
  | "Furniture"
  | "Shoes"
  | "Others";
