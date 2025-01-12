export interface ProductType {
  _id: string;
  productName: string;
  productDescription: string;
  images: string[];
  price: number;
  discountPrice: number;
  inventory: {
    quantity: number;
    colors: string[];
    sizes: string[];
  };
}
