import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const productPerPage = 20;

async function ProductList(categoryId: string, limit: number) {
  const wixClient = await wixClientServer();
  const items = await wixClient.products
    .queryProducts()
    .limit(limit || productPerPage)
    .find();

  return (
    <div className=" mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link
        href="/productName"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative h-80 w-full">
          <Image
            src="https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            fill
            alt=""
          />

          <Image
            src="https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md"
            fill
            alt=""
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Plants</span>
          <span className="font-semibold">$90</span>
        </div>
        <div className="text-sm text-gray-500">My wonderful product</div>
        <button className="rounded-2xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm w-max hover:bg-cartColor hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/productName"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative h-80 w-full">
          <Image
            src="https://images.pexels.com/photos/16586234/pexels-photo-16586234/free-photo-of-a-car-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            fill
            alt=""
          />

          <Image
            src="https://images.pexels.com/photos/12385673/pexels-photo-12385673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md"
            fill
            alt=""
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Chevys</span>
          <span className="font-semibold">$90,000</span>
        </div>
        <div className="text-sm text-gray-500">My wonderful product</div>
        <button className="rounded-2xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm w-max hover:bg-cartColor hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/productName"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative h-80 w-full">
          <Image
            src="https://images.pexels.com/photos/7127246/pexels-photo-7127246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            fill
            alt=""
          />

          <Image
            src="https://images.pexels.com/photos/15553579/pexels-photo-15553579/free-photo-of-crown-with-diamonds.jpeg?auto=compress&cs=tinysrgb&w=600"
            sizes="25vw"
            className="absolute object-cover rounded-md"
            fill
            alt=""
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Tiaras</span>
          <span className="font-semibold">$4000</span>
        </div>
        <div className="text-sm text-gray-500">My wonderful product</div>
        <button className="rounded-2xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm w-max hover:bg-cartColor hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/productName"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative h-80 w-full">
          <Image
            src="https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-close-up-of-wedding-veil-and-high-heels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            fill
            alt=""
          />

          <Image
            src="https://images.pexels.com/photos/8873042/pexels-photo-8873042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sizes="25vw"
            className="absolute object-cover rounded-md"
            fill
            alt=""
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Slingback Shoes</span>
          <span className="font-semibold">$950</span>
        </div>
        <div className="text-sm text-gray-500">My wonderful product</div>
        <button className="rounded-2xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm w-max hover:bg-cartColor hover:text-white">
          Add to Cart
        </button>
      </Link>
    </div>
  );
}

export default ProductList;
