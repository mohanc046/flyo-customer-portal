'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'
import 'swiper/css/effect-fade'

const slidesData = [
    {
        subDisplay: "Sale! Up To 50% Off!",
        display: "Summer Sale Collections",
        link: "/shop/breadcrumb-img",
        imgSrc: "/images/slider/bg1-1.png",
        imgWidth: 670,
        imgHeight: 936,
        imgAlt: "bg1-1",
        imgClasses: "absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0"
    },
    {
        subDisplay: "Sale! Up To 50% Off!",
        display: "Fashion for Every Occasion",
        link: "/shop/breadcrumb-img",
        imgSrc: "/images/slider/bg1-2.png",
        imgWidth: 670,
        imgHeight: 936,
        imgAlt: "bg1-2",
        imgClasses: "absolute w-1/2 2xl:-right-[60px] -right-[0] sm:-bottom-[60px] bottom-0"
    },
    {
        subDisplay: "Sale! Up To 50% Off!",
        display: "Stylish Looks for Any Season",
        link: "/shop/breadcrumb-img",
        imgSrc: "/images/slider/bg1-3.png",
        imgWidth: 670,
        imgHeight: 936,
        imgAlt: "bg1-3",
        imgClasses: "absolute sm:w-1/2 w-2/3 2xl:-right-[60px] -right-[36px] sm:bottom-0 -bottom-[30px]"
    }
]

const SliderOne = () => {
    return (
        <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
            <div className="slider-main h-full w-full">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    className="h-full relative"
                    autoplay={{
                        delay: 4000,
                    }}
                >
                    {slidesData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="slider-item h-full w-full relative">
                                <div className="container w-full h-full flex items-center relative">
                                    <div className="text-content basis-1/2">
                                        <div className="text-sub-display">{slide.subDisplay}</div>
                                        <div className="text-display md:mt-5 mt-2">{slide.display}</div>
                                        <Link href={slide.link} className="button-main md:mt-8 mt-3">
                                            Shop Now
                                        </Link>
                                    </div>
                                    <div className={slide.imgClasses}>
                                        <Image
                                            src={slide.imgSrc}
                                            width={slide.imgWidth}
                                            height={slide.imgHeight}
                                            alt={slide.imgAlt}
                                            priority={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default SliderOne
