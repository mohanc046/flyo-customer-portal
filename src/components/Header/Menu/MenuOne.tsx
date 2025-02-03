"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useLoginPopup from "@/store/useLoginPopup";
import useMenuMobile from "@/store/useMenuMobile";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useModalSearchContext } from "@/context/ModalSearchContext";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { isUserLoggedIn } from "@/utils/utils";

interface Props {
  props: string;
}

interface NavOption {
  name: string;
  path: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { openLoginPopup, handleLoginPopup } = useLoginPopup();
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const [navOptions, setNavOptions] = useState<NavOption[]>([
    { name: "Home", path: `/` },
    { name: "Login", path: "/login" },
  ]);
  const { openModalCart } = useModalCartContext();
  const { cartState } = useCart();
  const { openModalWishlist } = useModalWishlistContext();
  const { openModalSearch } = useModalSearchContext();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const { businessName } = useStore();

  const { storeData } = useStore();

  useEffect(() => {
    if (isUserLoggedIn()) {
      setNavOptions([
        { name: "Home", path: `/` },
        { name: "Orders", path: "/orders" },
        { name: "Cart", path: "/cart" },
        { name: "Logout", path: "/logout" },
      ]);
    }
  }, [isUserLoggedIn()]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  return (
    <>
      <div
        className={`header-menu bg-white style-one ${
          fixedHeader ? "fixed" : "relative"
        } top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}
      >
        <div className="container mx-auto h-full">
          <div className="header-main flex justify-between h-full">
            <div
              className="menu-mobile-icon lg:hidden flex items-center"
              onClick={handleMenuMobile}
            >
              <i className="icon-category text-2xl"></i>
            </div>
            <div className="left flex items-center gap-16">
              <div className="heading4">{businessName}</div>
              <div className="menu-main h-full max-lg:hidden">
                <ul className="flex items-center gap-8 h-full">
                  {navOptions.map((item, index) => (
                    <li className="h-full relative" key={index}>
                      <Link
                        href={item.path}
                        className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 ${
                          pathname === item.path ? "active" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right flex gap-12">
              <div className="list-action flex items-center gap-4">
                <div
                  className="user-icon flex items-center justify-center cursor-pointer"
                  onClick={handleLoginPopup}
                >
                  <Icon.User size={24} color="black" />
                </div>
                <div
                  className="max-md:hidden wishlist-icon flex items-center cursor-pointer"
                  onClick={openModalWishlist}
                >
                  <Icon.Heart size={24} color="black" />
                </div>
                <div
                  className="cart-icon flex items-center relative cursor-pointer"
                  onClick={openModalCart}
                >
                  <Icon.Handbag size={24} color="black" />
                  <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartState.cartArray.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
                <Link
                  href={"/"}
                  className="logo text-3xl font-semibold text-center"
                >
                  {businessName}
                </Link>
              </div>
              <div className="form-search relative mt-2">
                <Icon.MagnifyingGlass
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4"
                />
              </div>
              <div className="list-nav mt-6">
                <ul>
                  {navOptions.map((item, index) => (
                    <li
                      key={index}
                      className={`mt-5 ${
                        openSubNavMobile === index ? "open" : ""
                      }`}
                      onClick={() => handleOpenSubNavMobile(index)}
                    >
                      <a
                        href={item.path}
                        className="text-xl font-semibold flex items-center justify-between"
                      >
                        {item.name}
                        <span className="text-right">
                          <Icon.CaretRight size={20} />
                        </span>
                      </a>
                      <div className="sub-nav-mobile">
                        <div
                          className="back-btn flex items-center gap-3"
                          onClick={() => handleOpenSubNavMobile(index)}
                        >
                          <Icon.CaretLeft /> Back
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOne;
