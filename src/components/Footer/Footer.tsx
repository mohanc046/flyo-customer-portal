import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useStore } from "@/context/StoreContext";

const Footer = () => {
  const { businessName } = useStore();
  const contactInfo = [
    { label: "Mail:", value: "flyofashion@gmail.com" },
    { label: "Phone:", value: "1234567890" },
    { label: "Address:", value: "Chennai, TamilNadu - 600001" },
  ];

  const navSections = [
    {
      title: "Information",
      links: [
        { name: "Contact us", href: "/pages/contact" },
        { name: "Career", href: "" },
        { name: "My Account", href: "/my-account" },
        { name: "Order & Returns", href: "/order-tracking" },
        { name: "FAQs", href: "/pages/faqs" },
      ],
    },
    // {
    //   title: "Quick Shop",
    //   links: [
    //     { name: "Women", href: "/shop/breadcrumb1" },
    //     { name: "Men", href: "/shop/breadcrumb1" },
    //     { name: "Clothes", href: "/shop/breadcrumb1" },
    //     { name: "Accessories", href: "/shop/breadcrumb1" },
    //     { name: "Blog", href: "/blog" },
    //   ],
    // },
    {
      title: "Customer Services",
      links: [
        { name: "Orders FAQs", href: "/pages/faqs" },
        { name: "Shipping", href: "/pages/faqs" },
        { name: "Privacy Policy", href: "/pages/faqs" },
        { name: "Return & Refund", href: "/order-tracking" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/", className: "icon-facebook" },
    { href: "https://www.instagram.com/", className: "icon-instagram" },
    { href: "https://www.twitter.com/", className: "icon-twitter" },
    { href: "https://www.youtube.com/", className: "icon-youtube" },
    { href: "https://www.pinterest.com/", className: "icon-pinterest" },
  ];

  const paymentImages = [
    "/images/payment/Frame-0.png",
    "/images/payment/Frame-1.png",
    "/images/payment/Frame-2.png",
    "/images/payment/Frame-3.png",
    "/images/payment/Frame-4.png",
    "/images/payment/Frame-5.png",
  ];

  return (
    <div id="footer" className="footer">
      <div className="footer-main bg-surface">
        <div className="container">
          <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
              <Link href="/" className="logo">
                <div className="heading4">{businessName}</div>
              </Link>
              <div className="flex gap-3 mt-3">
                <div className="flex flex-col">
                  {contactInfo.map((info, index) => (
                    <span
                      key={index}
                      className={`text-button ${index > 0 ? "mt-3" : ""}`}
                    >
                      {info.label}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col">
                  {contactInfo.map((info, index) => (
                    <span key={index} className={index > 0 ? "mt-3" : ""}>
                      {info.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
              <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                {navSections.map((section, index) => (
                  <div key={index} className="item flex flex-col basis-1/3">
                    <div className="text-button-uppercase pb-3">
                      {section.title}
                    </div>
                    {section.links.map((link, idx) => (
                      //   <Link
                      //     key={idx}
                      //     className="caption1 has-line-before duration-300 w-fit pt-2"
                      //     href={link.href}
                      //   >
                      //     {link.name}
                      //   </Link>
                      <div
                        key={idx}
                        className="caption1 has-line-before duration-300 w-fit pt-2"
                      >
                        {link.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                <div className="text-button-uppercase">Newsletter</div>
                <div className="caption1 mt-3">
                  Sign up for our newsletter and get 10% off your first purchase
                </div>
                <div className="input-block w-full h-[52px] mt-4">
                  <form className="w-full h-full relative">
                    <input
                      type="email"
                      placeholder="Enter your e-mail"
                      className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
                      required
                    />
                    <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                      <Icon.ArrowRight size={24} color="#fff" />
                    </button>
                  </form>
                </div>
                <div className="list-social flex items-center gap-6 mt-4">
                  {socialLinks.map((link, index) => (
                    // <Link key={index} href={"/"} target="_blank">
                    //   <div
                    //     className={`text-2xl text-black ${link.className}`}
                    //   ></div>
                    // </Link>
                    <div
                      className={`text-2xl text-black ${link.className}`}
                      key={index}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
            <div className="left flex items-center gap-8">
              <div className="copyright caption1 text-secondary">
                ©2025 Flyashop. All Rights Reserved.
              </div>
              <div className="select-block flex items-center gap-5 max-md:hidden">
                <div className="choose-language flex items-center gap-1.5">
                  <select
                    name="language"
                    id="chooseLanguageFooter"
                    className="caption2 bg-transparent"
                  >
                    <option value="France">India</option>
                    <option value="English">English</option>
                    <option value="Espana">Espana</option>
                    <option value="France">France</option>
                  </select>
                  <Icon.CaretDown size={12} color="#1F1F1F" />
                </div>
                <div className="choose-currency flex items-center gap-1.5">
                  <select
                    name="currency"
                    id="chooseCurrencyFooter"
                    className="caption2 bg-transparent"
                  >
                    <option value="GBP">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <Icon.CaretDown size={12} color="#1F1F1F" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
