"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import { useStore } from "@/context/StoreContext";
import ImgRenderer from "../ImgOrVideoRenderer/ImgRenderer";
import Image from "next/image";
import { config } from "../../config";
import { Spinner } from "@/app/spinner";

const SliderOne = () => {
  const { banners, isLoading } = useStore();

  // Ensure only valid banners are passed
  const validBanners = banners.filter(
    (banner) => banner !== null && banner.trim() !== ""
  );

  return (
    <div className="slider-block style-one w-full ">
      {isLoading ? <Spinner /> :
        <div className="slider-main h-full w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={validBanners.length >= 3} // Enable loop only if there are enough slides
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative"
            autoplay={{
              delay: 4000,
            }}
          >
            {validBanners.length > 0 ? (
              validBanners.map((banner, index) => (
                <SwiperSlide key={index}>
                  <div className="slider-item h-full w-full relative lg:h-[75vh]">
                    <ImgRenderer
                      src={banner}
                      className="h-full w-full object-cover"
                      description={`Banner ${index + 1}`}
                      objectFit={"contain"}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="slider-item h-full w-full relative lg:h-[75vh]">
                  {!isLoading && (
                    <Image
                      src={config.BANNER_PLACEHOLDER}
                      height={500}
                      className="h-full w-full object-cover"
                      width={1500}
                      alt="apple"
                    />
                  )}
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      }
    </div>
  );
};

export default SliderOne;
