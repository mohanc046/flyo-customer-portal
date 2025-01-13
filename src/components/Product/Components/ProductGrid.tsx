"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProductType2 } from "@/type/ProductType";
import ImgOrVideoRenderer from "../../ImgOrVideoRenderer/ImgOrVideoRenderer";
interface ProductProps {
  data: ProductType2;
}

const ProductGrid: React.FC<ProductProps> = ({ data }) => {
  const router = useRouter();

  const handleDetailProduct = (data: ProductType2) => {
    router.push(`/product/default?id=${data._id}`);
  };

  const percentSale = Math.floor(100 - (data.discountPrice / data.price) * 100);

  return (
    <div className="product-item grid-type">
      <div
        onClick={() => handleDetailProduct(data)}
        className="product-main cursor-pointer block"
      >
        <ProductMedia media={data.images} name={data.productName} />
        <ProductInfo
          name={data.productName}
          price={data.discountPrice}
          originalPrice={data.price}
          percentSale={percentSale}
          available={data.inventory.quantity}
        />
      </div>
    </div>
  );
};

interface ProductMediaProps {
  media: string[];
  name: string;
}

interface ProductMediaProps {
  media: string[];
  name: string;
}

const ProductMedia: React.FC<ProductMediaProps> = ({ media, name }) => {
  const hasMedia = media && media.length > 0;
  return (
    <div
      className="product-thumb bg-white relative overflow-hidden rounded-2xl border border-gray-300"
      style={{ backgroundColor: "#00000080" }}
    >
      <div className="product-img w-full h-full aspect-[3/4]">
        {hasMedia ? (
          media.map((src, index) => (
            <ImgOrVideoRenderer
              key={index}
              src={src}
              className="w-full h-full object-contain duration-700"
              description={name}
            />
          ))
        ) : (
          <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            <span className="text-white">No media available</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice: number;
  percentSale: number;
  available: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  price,
  originalPrice,
  percentSale,
  available,
}) => (
  <div className="product-infor mt-4 lg:mb-7">
    <div className="product-name text-title duration-300">{name}</div>
    <ProductPrice
      price={price}
      originalPrice={originalPrice}
      percentSale={percentSale}
    />
    <div className="text-button-uppercase mt-2">
      <span className="text-secondary2">Available: </span>
      <span>{available}</span>
    </div>
  </div>
);

interface ProductPriceProps {
  price: number;
  originalPrice: number;
  percentSale: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
  percentSale,
}) => (
  <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
    <div className="product-price text-title">₹{price}</div>
    {percentSale > 0 && (
      <>
        <div className="product-origin-price caption1 text-secondary2">
          <del>₹{originalPrice}</del>
        </div>
        <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
          -{percentSale}%
        </div>
      </>
    )}
  </div>
);

export default ProductGrid;
