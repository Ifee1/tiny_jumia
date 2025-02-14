import { wixClientServer } from "@/lib/wixClientServer";
import { collections } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function CategoryList() {
  const wixClient = await wixClientServer();
  const fetchedCategories = await wixClient.collections
    .queryCollections()
    .find();
  // console.log(fetchedCategories);
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {fetchedCategories.items.map(function (
          collections: collections.Collection
        ) {
          return (
            <Link
              // href="/"
              href={`/list?cat=${collections.slug}`}
              // href={"/list/category" + collections._id}o
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
              key={collections._id}
            >
              <div className="relative bg-slate-100 h-96 w-full">
                <Image
                  src={
                    collections.media?.mainMedia?.image?.url || "/product.png"
                  }
                  alt=""
                  sizes="20vw"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="mt-8 font-light text-xl tracking-wide">
                {collections.name}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryList;
