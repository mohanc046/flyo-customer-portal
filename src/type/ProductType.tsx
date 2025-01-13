interface Variation {
  color: string;
  colorCode: string;
  colorImage: string;
  image: string;
}
export interface ProductType {
  id: string;
  category: string;
  type: string;
  name: string;
  gender: string;
  new: boolean;
  sale: boolean;
  price: number;
  rate: number;
  originPrice: number;
  brand: string;
  sold: number;
  quantity: number;
  quantityPurchase: number;
  sizes: Array<string>;
  variation: Variation[];
  thumbImage: Array<string>;
  description: string;
  action: string;
  slug: string;
  images: string[];
}

export interface ProductType2 {
  _id: string | "";
  productName: string | "";
  productDescription: string | "";
  images: string[] | [];
  price: number | 0;
  discountPrice: number | 0;
  inventory: {
    quantity: number | 0;
    colors: string[] | [];
    sizes: string[] | [];
  };
}
