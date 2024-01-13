export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  mediaGallery?: string[];
};

export type LineItem = {
  product: Product;
  quantity: number;
};

export interface IProductsCollection {
  products: Product[];
  label: string;
  id: number;
}
