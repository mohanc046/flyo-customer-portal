"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import Image from "next/image";
import { ProductType } from "@/type/ProductType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from "swiper/core";
import ImgOrVideoRenderer from "@/components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import Rate from "@/components/Other/Rate";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import Link from "next/link";
import ProductGrid from "../Components/ProductGrid";

interface Props {
  data: Array<ProductType>;
  productId: string | number | null;
}

const Default: React.FC<Props> = ({ productId }) => {
  const { getProductByID } = useProductContext(); // Get product from context
  const [product, setProduct] = useState<ProductType | null>(null);
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { products, updatePayload } = useProductContext();
  const [activeColor, setActiveColor] = useState();

  const swiperRef: any = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  useEffect(() => {
    if (productId) {
      const fetchedProduct = getProductByID(productId as string); // Fetch product by ID
      setProduct(fetchedProduct);
    }
  }, [productId, getProductByID]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSwiper = (swiper: SwiperCore) => {
    setThumbsSwiper(swiper);
  };

  // const handleAddToWishlist = () => {
  //   // if product existed in wishlit, remove from wishlist and set state to false
  //   if (wishlistState.wishlistArray.some((item) => item._id === product._id)) {
  //     removeFromWishlist(product._id);
  //   } else {
  //     // else, add to wishlist and set state to true
  //     addToWishlist(product);
  //   }
  //   openModalWishlist();
  // };

  return (
    <>
      <div className="product-detail default">
        <div className="featured-product underwear md:py-20 py-10">
          <div className="container flex justify-between gap-y-6 flex-wrap">
            <div className="list-img md:w-1/2 md:pr-[45px] w-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
                className="mySwiper2 rounded-2xl overflow-hidden"
              >
                {product.images?.map((item, index) => (
                  <SwiperSlide
                    style={{ backgroundColor: "#000" }}
                    key={index}
                    onClick={() => {
                      swiperRef.current?.slideTo(index);
                    }}
                  >
                    <ImgOrVideoRenderer
                      key={index}
                      src={item}
                      width={1000}
                      height={1000}
                      alt="prd-img"
                      className="w-full aspect-[3/4] object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Swiper
                onSwiper={(swiper) => {
                  handleSwiper(swiper);
                }}
                spaceBetween={0}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="mySwiper"
              >
                {product.images.map((item, index) => (
                  <SwiperSlide key={index} style={{backgroundColor: "#000"}}>
                    <ImgOrVideoRenderer
                      key={index}
                      src={item}
                      width={1000}
                      height={1000}
                      alt="prd-img"
                      className="w-full aspect-[3/4] object-contain rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper> */}
              <Swiper
                onSwiper={(swiper) => {
                  handleSwiper(swiper);
                }}
                spaceBetween={0}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="mySwiper"
              >
                {Array(3)
                  .fill(product.images[0])
                  .map((item, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ backgroundColor: "#000" }}
                    >
                      <ImgOrVideoRenderer
                        key={index}
                        src={item}
                        width={1000}
                        height={1000}
                        alt={`prd-img-₹{index + 1}`}
                        className="w-full aspect-[3/4] object-contain rounded-xl"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
              <div className="flex justify-between">
                <div>
                  <div className="caption2 text-secondary font-semibold uppercase">
                    {"Home & Appliances"}
                  </div>
                  <div className="heading4 mt-1">{product.productName}</div>
                </div>
                <div
                  className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ₹{
                    wishlistState.wishlistArray.some(
                      (item) => item._id === product._id
                    )
                      ? "active"
                      : ""
                  }`}
                  // onClick={handleAddToWishlist}
                >
                  {wishlistState.wishlistArray.some(
                    (item) => item._id === product._id
                  ) ? (
                    <>
                      <Icon.Heart
                        size={24}
                        weight="fill"
                        className="text-white"
                      />
                    </>
                  ) : (
                    <>
                      <Icon.Heart size={24} />
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <Rate currentRate={5} size={14} />
                <span className="caption1 text-secondary">(1.234 reviews)</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                <div className="product-price heading5">
                  ₹{product.price}.00
                </div>
                <div className="w-px h-4 bg-line"></div>
                <div className="product-origin-price font-normal text-secondary2">
                  <del>₹{product.price}.00</del>
                </div>
                {product.price && (
                  <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                    -
                    {Math.floor(
                      100 - (product.discountPrice / product.price) * 100
                    )}
                    %
                  </div>
                )}
                <div className="desc text-secondary mt-3">
                  {product.productDescription}
                </div>
              </div>
              <div className="list-action mt-6">
                {/* <div className="choose-color">
                  <div className="text-title">
                    Colors:{" "}
                    <span className="text-title color">{activeColor}</span>
                  </div>
                  <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                    {product.variation.map((item, index) => (
                      <div
                        className={`color-item w-12 h-12 rounded-xl duration-300 relative ₹{
                          activeColor === item.color ? "active" : ""
                        }`}
                        key={index}
                        datatype={item.image}
                        onClick={() => {
                          handleActiveColor(item.color);
                        }}
                      >
                        <Image
                          src={item.colorImage}
                          width={100}
                          height={100}
                          alt="color"
                          className="rounded-xl"
                        />
                        <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                          {item.color}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="choose-size mt-5">
                  <div className="heading flex items-center justify-between">
                    <div className="text-title">
                      Size:{" "}
                      <span className="text-title size">{activeSize}</span>
                    </div>
                    <div
                      className="caption1 size-guide text-red underline cursor-pointer"
                      onClick={handleOpenSizeGuide}
                    >
                      Size Guide
                    </div>
                    <ModalSizeguide
                      data={product}
                      isOpen={openSizeGuide}
                      onClose={handleCloseSizeGuide}
                    />
                  </div>
                  <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                    {product.sizes.map((item, index) => (
                      <div
                        className={`size-item ₹{
                          item === "freesize" ? "px-3 py-2" : "w-12 h-12"
                        } flex items-center justify-center text-button rounded-full bg-white border border-line ₹{
                          activeSize === item ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => handleActiveSize(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="button-block mt-5">
                  <div className="button-main w-full text-center">
                    Buy It Now
                  </div>
                </div>
                <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-line">
                  <div
                    className="compare flex items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                      <Icon.ArrowsCounterClockwise className="heading6" />
                    </div>
                    <span>Compare</span>
                  </div>
                  <div className="share flex items-center gap-3 cursor-pointer">
                    <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                      <Icon.ShareNetwork weight="fill" className="heading6" />
                    </div>
                    <span>Share Product</span>
                  </div>
                </div>
                <div className="more-infor mt-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Icon.ArrowClockwise className="body1" />
                      <div className="text-title">Delivery & Return</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon.Question className="body1" />
                      <div className="text-title">Ask A Question</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <Icon.Timer className="body1" />
                    <div className="text-title">Estimated Delivery:</div>
                    <div className="text-secondary">
                      14 January - 18 January
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <Icon.Eye className="body1" />
                    <div className="text-title">38</div>
                    <div className="text-secondary">
                      people viewing this product right now!
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">SKU:</div>
                    <div className="text-secondary">53453412</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Categories:</div>
                    <div className="text-secondary">
                      {"Women"}, {"Fashion"}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="text-title">Tag:</div>
                    <div className="text-secondary">{"Dresses"}</div>
                  </div>
                </div>
              </div>
              <div className="get-it mt-10 pb-8 border-b border-line">
                <div className="heading5">Get it today</div>
                <div className="item flex items-center gap-3 mt-4">
                  <div className="icon-delivery-truck text-4xl"></div>
                  <div>
                    <div className="text-title">Free shipping</div>
                    <div className="caption1 text-secondary mt-1">
                      Free shipping on orders over ₹1000.
                    </div>
                  </div>
                </div>
                <div className="item flex items-center gap-3 mt-4">
                  <div className="icon-phone-call text-4xl"></div>
                  <div>
                    <div className="text-title">Support everyday</div>
                    <div className="caption1 text-secondary mt-1">
                      Support from 8:30 AM to 10:00 PM everyday
                    </div>
                  </div>
                </div>
                <div className="item flex items-center gap-3 mt-4">
                  <div className="icon-return text-4xl"></div>
                  <div>
                    <div className="text-title">10 Day Returns</div>
                    <div className="caption1 text-secondary mt-1">
                      Not impressed? Get a refund. You have 10 days to break our
                      hearts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="desc-tab md:pb-20 pb-10"></div>
        <div className="review-block md:py-20 py-10 bg-surface">
          <div className="container">
            <div className="heading flex items-center justify-between flex-wrap gap-4">
              <div className="heading4">Customer Review</div>
              <Link
                href={"#form-review"}
                className="button-main bg-white text-black border border-black"
              >
                Write Reviews
              </Link>
            </div>
            <div className="top-overview flex justify-between py-6 max-md:flex-col gap-y-6">
              <div className="rating lg:w-1/4 md:w-[30%] lg:pr-[75px] md:pr-[35px]">
                <div className="heading flex items-center justify-center flex-wrap gap-3 gap-y-4">
                  <div className="text-display">4.6</div>
                  <div className="flex flex-col items-center">
                    <Rate currentRate={5} size={18} />
                    <div className="text-secondary text-center mt-1">
                      (1,968 Ratings)
                    </div>
                  </div>
                </div>
                <div className="list-rating mt-3">
                  <div className="item flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1">
                      <div className="caption1">5</div>
                      <Icon.Star size={14} weight="fill" />
                    </div>
                    <div className="progress bg-line relative w-3/4 h-2">
                      <div className="progress-percent absolute bg-yellow w-[50%] h-full left-0 top-0"></div>
                    </div>
                    <div className="caption1">50%</div>
                  </div>
                  <div className="item flex items-center justify-between gap-1.5 mt-1">
                    <div className="flex items-center gap-1">
                      <div className="caption1">4</div>
                      <Icon.Star size={14} weight="fill" />
                    </div>
                    <div className="progress bg-line relative w-3/4 h-2">
                      <div className="progress-percent absolute bg-yellow w-[20%] h-full left-0 top-0"></div>
                    </div>
                    <div className="caption1">20%</div>
                  </div>
                  <div className="item flex items-center justify-between gap-1.5 mt-1">
                    <div className="flex items-center gap-1">
                      <div className="caption1">3</div>
                      <Icon.Star size={14} weight="fill" />
                    </div>
                    <div className="progress bg-line relative w-3/4 h-2">
                      <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                    </div>
                    <div className="caption1">10%</div>
                  </div>
                  <div className="item flex items-center justify-between gap-1.5 mt-1">
                    <div className="flex items-center gap-1">
                      <div className="caption1">2</div>
                      <Icon.Star size={14} weight="fill" />
                    </div>
                    <div className="progress bg-line relative w-3/4 h-2">
                      <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                    </div>
                    <div className="caption1">10%</div>
                  </div>
                  <div className="item flex items-center justify-between gap-1.5 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="caption1">1</div>
                      <Icon.Star size={14} weight="fill" />
                    </div>
                    <div className="progress bg-line relative w-3/4 h-2">
                      <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                    </div>
                    <div className="caption1">10%</div>
                  </div>
                </div>
              </div>
              <div className="list-img lg:w-3/4 md:w-[70%] lg:pl-[15px] md:pl-[15px]">
                <div className="heading5">All Image (128)</div>
                <div className="list md:mt-6 mt-3">
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={3}
                    modules={[Navigation]}
                    breakpoints={{
                      576: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                      },
                      640: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                      },
                      992: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                      },
                      1100: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                      },
                      1290: {
                        slidesPerView: 7,
                        spaceBetween: 20,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={"/images/product/1000x1000.png"}
                        width={400}
                        height={400}
                        alt=""
                        className="w-[120px] aspect-square object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="sorting flex items-center flex-wrap md:gap-5 gap-3 gap-y-3 mt-6">
                  <div className="text-button">Sort by</div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    Newest
                  </div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    5 Star
                  </div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    4 Star
                  </div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    3 Star
                  </div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    2 Star
                  </div>
                  <div className="item bg-white px-4 py-1 border border-line rounded-full">
                    1 Star
                  </div>
                </div>
              </div>
            </div>
            <div className="list-review">
              <div className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
                <div className="left lg:w-1/4 w-full lg:pr-[15px]">
                  <div className="list-img-review flex gap-2">
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                  </div>
                  <div className="user mt-3">
                    <div className="text-title">Tony Nguyen</div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary2">1 days ago</div>
                      <div className="text-secondary2">-</div>
                      <div className="text-secondary2">
                        <span>Yellow</span> / <span>XL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right lg:w-3/4 w-full lg:pl-[15px]">
                  <Rate currentRate={5} size={16} />
                  <div className="heading5 mt-3">
                    Unbeatable Style and Quality: A Fashion Brand That Delivers
                  </div>
                  <div className="body1 mt-3">
                    I can{String.raw`'t`} get enough of the fashion pieces from
                    this brand. They have a great selection for every occasion
                    and the prices are reasonable. The shipping is fast and the
                    items always arrive in perfect condition.
                  </div>
                  <div className="action mt-3">
                    <div className="flex items-center gap-4">
                      <div className="like-btn flex items-center gap-1 cursor-pointer">
                        <Icon.HandsClapping size={18} />
                        <div className="text-button">20</div>
                      </div>
                      <Link
                        href={"#form-review"}
                        className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                      >
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
                <div className="left lg:w-1/4 w-full lg:pr-[15px]">
                  <div className="list-img-review flex gap-2">
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                  </div>
                  <div className="user mt-3">
                    <div className="text-title">Tony Nguyen</div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary2">1 days ago</div>
                      <div className="text-secondary2">-</div>
                      <div className="text-secondary2">
                        <span>Yellow</span> / <span>XL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right lg:w-3/4 w-full lg:pl-[15px]">
                  <Rate currentRate={5} size={16} />
                  <div className="heading5 mt-3">
                    Exceptional Fashion: The Perfect Blend of Style and
                    Durability
                  </div>
                  <div className="body1 mt-3">
                    The fashion brand{String.raw`'s`} online shopping experience
                    is seamless. The website is user-friendly, the product
                    images are clear, and the checkout process is quick.
                  </div>
                  <div className="action mt-3">
                    <div className="flex items-center gap-4">
                      <div className="like-btn flex items-center gap-1 cursor-pointer">
                        <Icon.HandsClapping size={18} />
                        <div className="text-button">20</div>
                      </div>
                      <Link
                        href={"#form-review"}
                        className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                      >
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
                <div className="left lg:w-1/4 w-full lg:pr-[15px]">
                  <div className="list-img-review flex gap-2">
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                    <Image
                      src={"/images/product/1000x1000.png"}
                      width={200}
                      height={200}
                      alt="img"
                      className="w-[60px] aspect-square rounded-lg"
                    />
                  </div>
                  <div className="user mt-3">
                    <div className="text-title">Tony Nguyen</div>
                    <div className="flex items-center gap-2">
                      <div className="text-secondary2">1 days ago</div>
                      <div className="text-secondary2">-</div>
                      <div className="text-secondary2">
                        <span>Yellow</span> / <span>XL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right lg:w-3/4 w-full lg:pl-[15px]">
                  <Rate currentRate={5} size={16} />
                  <div className="heading5 mt-3">
                    Elevate Your Wardrobe: Stunning Dresses That Make a
                    Statement
                  </div>
                  <div className="body1 mt-3">
                    I love how sustainable and ethically conscious this fashion
                    brand is. They prioritize eco-friendly materials and fair
                    trade practices, which makes me feel good about supporting
                    them.
                  </div>
                  <div className="action mt-3">
                    <div className="flex items-center gap-4">
                      <div className="like-btn flex items-center gap-1 cursor-pointer">
                        <Icon.HandsClapping size={18} />
                        <div className="text-button">20</div>
                      </div>
                      <Link
                        href={"#form-review"}
                        className="reply-btn text-button text-secondary cursor-pointer hover:text-black"
                      >
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-button more-review-btn text-center mt-2 underline">
                View More Comments
              </div>
            </div>
            <div id="form-review" className="form-review pt-6">
              <div className="heading4">Leave A comment</div>
              <form className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-6">
                <div className="name ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    type="text"
                    placeholder="Your Name *"
                    required
                  />
                </div>
                <div className="mail ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Your Email *"
                    required
                  />
                </div>
                <div className="col-span-full message">
                  <textarea
                    className="border border-line px-4 py-3 w-full rounded-lg"
                    id="message"
                    name="message"
                    placeholder="Your message *"
                    required
                  ></textarea>
                </div>
                <div className="col-span-full flex items-start -mt-2 gap-2">
                  <input
                    type="checkbox"
                    id="saveAccount"
                    name="saveAccount"
                    className="mt-1.5"
                  />
                  <label className="" htmlFor="saveAccount">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>
                <div className="col-span-full sm:pt-3">
                  <button className="button-main bg-white text-black border border-black">
                    Submit Reviews
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="related-product md:py-20 py-10">
          <div className="container">
            <div className="heading3 text-center">Related Products</div>
            <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
              {products.slice(0, 4).map((prd, index) => (
                <ProductGrid data={prd} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Default;
