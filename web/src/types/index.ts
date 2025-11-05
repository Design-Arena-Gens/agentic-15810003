export type Category =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Toys"
  | "Automotive"
  | "Books";

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: string[];
  category: Category;
  rating: number;
  reviews: Review[];
  stock: number;
  brand: string;
  tags?: string[];
  features?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  country: string;
  city: string;
  addressLine: string;
  postalCode: string;
  phone: string;
}

export interface CheckoutState {
  address: ShippingAddress | null;
  paymentMethod: "card" | "cod" | "paypal" | null;
  note?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar: string;
  token: string;
}
