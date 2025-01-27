"use client";

import React, { useState, useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import { useCategoryContext } from "@/context/CategoryContext"; // Import CategoryContext
import ProductGrid from "../Product/Components/ProductGrid";
import { motion } from "framer-motion";

interface Props {
  start: number;
  limit: number;
  storeName: string | null;
}

const WhatNewOne: React.FC<Props> = ({ start, limit, storeName }) => {
  const { products, updatePayload } = useProductContext();
  const { isLoading, error, fetchCategoriesData } = useCategoryContext();
  const { categoryList } = useCategoryContext();

  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    updatePayload({ storeName: storeName || "" });
    if (categoryList.length === 0) {
      fetchCategoriesData();
    }
  }, [categoryList, fetchCategoriesData]);

  const handleTabClick = (categoryKey: string) => {
    setActiveTab(categoryKey);
    updatePayload({ category: categoryKey });
  };

  const filteredProducts = products.slice(start, limit);

  return (
    <div className="whate-new-block md:pt-20 pt-10">
      <div className="container">
        <div className="heading flex flex-col items-center text-center">
          <div className="heading3">What&apos;s new</div>

          {isLoading ? (
            <div>Loading categories...</div>
          ) : error ? (
            <div>Error loading categories</div>
          ) : (
            <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl mt-6">
              {categoryList &&
                categoryList.map((category) => {
                  const categoryKey = category.key; // Use `key` property safely
                  const categoryValue = category.value; // Use `value` property safely

                  return (
                    <div
                      key={categoryValue}
                      className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${
                        activeTab === categoryValue ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(categoryValue)}
                    >
                      {activeTab === categoryValue && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-2xl bg-white"
                        ></motion.div>
                      )}
                      <span className="relative text-button-uppercase z-[1]">
                        {categoryKey}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
          {filteredProducts.map((prd, index) => (
            <ProductGrid data={prd} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatNewOne;
