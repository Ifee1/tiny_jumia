import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Pagination from "../pagination/Pagination";

const productPerPage = 5;

async function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit: number;
  searchParams?: any;
}) {
  const wixClient = await wixClientServer();
  let productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999)
    .limit(limit || productPerPage)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || productPerPage)
        : 0
    );
  // .find();

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery = productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery = productQuery.descending(sortBy);
    }
  }
  const fetchedProducts = await productQuery.find();
  // console.log(fetchedProducts.items[0]);
  return (
    <div className=" mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {fetchedProducts.items.map(function (product: products.Product) {
        return (
          <Link
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product._id}
          >
            <div className="relative h-80 w-full">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                // src="https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                fill
                alt=""
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1].image?.url || "/product.png"}
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                  fill
                  alt=""
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <div>
                <span className="font-medium">{product.price?.currency}</span>
                <span className="font-semibold">{product.price?.price}</span>
              </div>
            </div>
            {/* <div className="text-sm text-gray-500">{product.description}</div> */}
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description || ""),
              }}
            >
              {/* {product.description} */}
            </div>

            {/* {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections?.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )} */}
            <button className="rounded-2xl ring-1 ring-cartColor text-cartColor py-2 px-4 text-sm w-max hover:bg-cartColor hover:text-white">
              Add to Cart
            </button>
          </Link>
        );
      })}
      {searchParams?.cat ||
        (searchParams?.name && (
          <Pagination
            currentPage={fetchedProducts.currentPage || 0}
            previousPage={fetchedProducts.hasPrev()}
            nextPage={fetchedProducts.hasNext()}
          />
        ))}
    </div>
  );
}

export default ProductList;
