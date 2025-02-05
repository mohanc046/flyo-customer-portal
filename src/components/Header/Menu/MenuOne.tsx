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
  }, []);

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

  const handleNavClick = (path: string) => {
    router.push(path);
    handleMenuMobile();
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
              <div
                className="max-md:hidden search-icon flex items-center cursor-pointer relative"
                onClick={openModalSearch}
              >
                <Icon.MagnifyingGlass size={24} color="black" />
                <div className="line absolute bg-line w-px h-6 -right-6"></div>
              </div>
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
              <div className="list-nav mt-6">
                <ul>
                  {navOptions.map((item, index) => (
                    <li
                      key={index}
                      className={`mt-5`}
                      onClick={() => handleNavClick(item.path)}
                    >
                      <a className="text-xl font-semibold flex items-center justify-between">
                        {item.name}
                      </a>
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
