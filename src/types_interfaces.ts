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
  id: string;
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

// user type
export interface IUser {
  id: string;
  role: TRole;
  username: string;
}

export type TRole = "ADMIN" | "BASIC";

// interface for single order item
export interface IOrderItem {
  [key: string]: any; // any other properties is allowed too.
  id: string;
  paidAt: Date | number | undefined; //Date | null | string | number | undefined
  totalPaid: string;
  totalItems: string;
}
