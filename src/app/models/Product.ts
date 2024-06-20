export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  quantity: number;
  tags: string[];
}
