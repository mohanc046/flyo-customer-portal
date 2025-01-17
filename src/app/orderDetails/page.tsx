"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import MenuOne from "@/components/Header/Menu/MenuOne";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Footer from "@/components/Footer/Footer";
import ImgOrVideoRenderer from "@/components/ImgOrVideoRenderer/ImgOrVideoRenderer";

const OrderDetails = () => {
  const { getOrderByID } = useOrders();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (orderId) {
      const fetchedOrder = getOrderByID(orderId); // Fetch order by ID
      setOrder(fetchedOrder);
      setLoading(false); // Stop loading when order is fetched
    }
  }, [orderId, getOrderByID]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-4">Loading order details...</p>
    );
  }

  if (!order) {
    return <p className="text-center text-red-500 mt-4">Order not found.</p>;
  }

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Orders" subHeading="Orders" />
      </div>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>

        {/* Order Info Section */}
        <div className="mb-6 p-4 bg-white shadow rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h6 className="font-bold text-base sm:text-lg">{`Order ID: ${order.orderId}`}</h6>
            <span
              className="mt-2 sm:mt-0 text-white px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: "gray" }}
            >
              {order.status}
            </span>
          </div>
          <hr className="mb-4" />
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/5 mb-4 md:mb-0">
              <ImgOrVideoRenderer
                src={
                  order?.products[0]?.product?.images[0] ||
                  "https://via.placeholder.com/80"
                }
                width={200}
                description="product media"
              />
            </div>
            <div className="w-full md:w-3/5 mb-4 md:mb-0">
              <h6 className="font-semibold text-sm sm:text-base">
                {order.products[0]?.product?.productName || "Product Name"}
              </h6>
              <p className="text-gray-500 text-sm sm:text-base">
                ₹{order.products[0]?.product?.price} per piece
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.products[0]?.quantity} X ₹
                {order.products[0]?.product?.price}
              </p>
            </div>
            <div className="w-full md:w-1/5 text-right">
              <ul className="space-y-1">
                <li className="flex justify-between text-sm sm:text-base">
                  <span>Item Total</span>
                  <strong>
                    ₹
                    {order.products[0]?.quantity *
                      order.products[0]?.product?.price}
                  </strong>
                </li>
                <li className="flex justify-between text-sm sm:text-base">
                  <span>Delivery</span>
                  <strong>₹0</strong>
                </li>
                <li className="flex justify-between text-sm sm:text-base">
                  <span>Grand Total</span>
                  <strong>₹{order.totalOrderCost}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="mb-6 p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h6 className="font-bold text-base sm:text-lg">Customer Details</h6>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="font-medium text-sm sm:text-base">Name</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.userId?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Email</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.userId?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Location</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.shippingAddress?.street || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">City</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.shippingAddress?.city || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">State</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.shippingAddress?.state || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Pin Code</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {order.shippingAddress?.pinCode || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mb-6 p-4 bg-white shadow rounded-lg">
          <h6 className="font-bold text-base sm:text-lg mb-4">Activity</h6>
          <p className="text-gray-500 text-sm sm:text-base">
            <strong>Order Placed:</strong>{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderDetails;
