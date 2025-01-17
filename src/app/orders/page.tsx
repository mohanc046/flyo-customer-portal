"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import ImgOrVideoRenderer from "@/components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { useOrders } from "@/context/OrdersContext";

const Orders = () => {
  const { orders, loading } = useOrders();
  const router = useRouter();

  const redirectToOrderDetails = (orderId: string) => {
    router.push(`/orderDetails/?id=${orderId}`);
  };

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Orders" subHeading="Orders" />
      </div>
      <div className="orders-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            <div className="w-full">
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className="w-full">
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/3">
                        <div className="text-button text-center">Item</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Order ID</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">
                          Total Cost
                        </div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Status</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Action</div>
                      </div>
                    </div>
                  </div>
                  <div className="list-product-main w-full mt-3">
                    {loading ? (
                      <p className="text-button pt-3">Loading orders...</p>
                    ) : orders.length === 0 ? (
                      <p className="text-button pt-3">No orders found</p>
                    ) : (
                      orders.map((order) => (
                        <div
                          className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                          key={order._id}
                        >
                          <div className="w-1/3">
                            <div className="flex items-center gap-6">
                              <div className="bg-img md:w-[100px] w-20 aspect-[3/4] border border-color-gray300 rounded">
                                <ImgOrVideoRenderer
                                  src={order.products[0].product.images[0]}
                                  width={1000}
                                  height={1000}
                                  alt={order.products[0].product.productName}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="text-title w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
                                  {order.products[0].product.productName}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-1/6 flex items-center justify-center">
                            <div className="text-title text-center">
                              {order.orderId}
                            </div>
                          </div>

                          <div className="w-1/6 flex items-center justify-center">
                            <div className="text-title text-center">
                              ₹{order.totalOrderCost}.00
                            </div>
                          </div>

                          <div className="w-1/6 flex items-center justify-center">
                            <div
                              className={`text-title text-center ${
                                order.status === "DELIVERED"
                                  ? "text-green-500"
                                  : order.status === "SHIPPED"
                                  ? "text-blue-500"
                                  : "text-red-500"
                              }`}
                            >
                              {order.status}
                            </div>
                          </div>

                          <div className="w-1/6 flex items-center justify-center">
                            <button
                              className="button-main px-4 py-2"
                              onClick={() => redirectToOrderDetails(order._id)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
