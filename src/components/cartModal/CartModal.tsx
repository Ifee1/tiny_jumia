"use client";

import Image from "next/image";
import React from "react";

function CartModal() {
  const cartItems = true;
  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {cartItems ? (
        // CART LIST
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {/* {ITEM} */}
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                width={72}
                height={72}
                alt=""
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP DIV */}
                <div className="">
                  {/* PRODUCT TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$56</div>
                  </div>
                  {/* PRODUCT DESC */}
                  <div className="text-sm text-gray-500">
                    Lorem ipsum, dolor sit.
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Quantity 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
            {/* ITEM */}
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                width={72}
                height={72}
                alt=""
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP DIV */}
                <div className="">
                  {/* PRODUCT TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$56</div>
                  </div>
                  {/* PRODUCT DESC */}
                  <div className="text-sm text-gray-500">
                    Lorem ipsum, dolor sit.
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Quantity 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTToM */}
          <div className="">
            <div className=" flex items-center justify-between font-semibold">
              <span>SubTotal</span>
              <span>$89</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
              quod!
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-400">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Check out
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="">Cart is empty</div>
      )}
    </div>
  );
}

export default CartModal;
