"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/ProductContext";
import ImgOrVideoRenderer from "../ImgOrVideoRenderer/ImgOrVideoRenderer";

const Collection = () => {
  const router = useRouter();
  const { products, updatePayload } = useProductContext(); // Assuming the 'products' state is available here.

  //   useEffect(() => {
  //     // Optional: If you want to fetch/update data when the component mounts, call updatePayload or a similar function.
  //     updatePayload();
  //   }, [updatePayload]);

  const handleProductClick = (productId: string) => {
    router.push(`/product/default?id=${productId}`);
  };

  return (
    <>
      <div className="collection-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading3 text-center">Explore Products</div>
        </div>
        <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            navigation
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="h-full"
          >
            {products.map(
              (product) =>
                product.images[0] && (
                  <SwiperSlide key={product._id}>
                    <div
                      className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer border border-gray-300"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div
                        className="product-img w-full h-full aspect-[3/4]"
                        style={{ backgroundColor: "#00000080" }}
                      >
                        <ImgOrVideoRenderer
                          src={product.images[0]}
                          className="w-full h-full object-cover duration-700"
                          description={name}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Collection;
