// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  seller: {
    id: number;
    email: string;
  };
}