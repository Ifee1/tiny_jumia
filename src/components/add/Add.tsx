"use client";

import React, { useState } from "react";

function Add({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) {
  const [quantity, setQuantity] = useState(1);
  // const stock = 3;

  function increaseQuantity() {
    setQuantity(quantity + 1);
    if (quantity === stockNumber) {
      setQuantity(stockNumber);
    }
  }
  function decreaseQuantity() {
    setQuantity(quantity - 1);
    if (quantity === 1) {
      setQuantity(1);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-medium">Choose Quantity</h2>
      <div className=" flex justify-between">
        <div className=" flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              onClick={decreaseQuantity}
              className="cursor-pointer text-xl"
            >
              -
            </button>
            {quantity}
            <button
              onClick={increaseQuantity}
              className="cursor-pointer text-xl"
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-sm">Out of Stock</div>
          ) : (
            <div className="text-sm">
              <span className="text-orange-400">{stockNumber} items</span> left!{" "}
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>

        <button
          className="w-36 rounded-3xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm
        hover:bg-cartColor hover:text-white disabled:cursor-not-allowed disabled:bg-pink-300 disabled:text-white disabled:ring-none
        "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Add;
