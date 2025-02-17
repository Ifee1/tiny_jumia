import Add from "@/components/add/Add";
import CustomizedProducts from "@/components/customizedProducts/CustomizedProducts";
import ProductImages from "@/components/productImages/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { UpdatedVariant } from "../types/types";

async function SinglePage({ params }: { params: { slug: string } }) {
  // console.log(params.slug);

  const wixClient = await wixClientServer();
  const singleProduct = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();
  // console.log(singleProduct);

  if (!singleProduct.items[0]) {
    return notFound();
  }
  const productOnDisplay = singleProduct.items[0];
  // console.log(productOnDisplay.variants);
  // console.log(
  //   "Product Options with Choices:",
  //   JSON.stringify(productOnDisplay.productOptions, null, 2)
  // );
  // productOnDisplay?.variants?.forEach((variant, index) => {
  //   console.log(`Variant ${index}:`, JSON.stringify(variant, null, 2));
  // });

  return (
    <div className="px-4 md:px-8 lg:pd-16 xl:32 2xl:px-64 flex flex-col lg:flex-row gap-16">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={productOnDisplay.media?.items} />
      </div>
      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="font-medium text-4xl">{productOnDisplay.name}</h1>
        <div
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(productOnDisplay.description || ""),
          }}
          suppressHydrationWarning={true}
        >
          {/* {productOnDisplay.description} */}
        </div>
        <div className="bg-gray-100 h-[2px]" />
        {productOnDisplay.priceData?.price ===
        productOnDisplay.priceData?.discountedPrice ? (
          <div className="flex items-center gap-4">
            <h2 className="text-2xl text-gray-500 font-medium">
              {productOnDisplay.priceData?.currency}
            </h2>
            <h2 className="text-2xl text-gray-500 font-medium">
              {productOnDisplay.priceData?.price}
            </h2>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h2 className="text-2xl text-gray-500 font-medium">
              {productOnDisplay.priceData?.currency}
            </h2>
            <h3 className="text-xl text-gray-500 line-through">
              {productOnDisplay.priceData?.discountedPrice}
            </h3>
            <h2 className="text-2xl text-gray-500 font-medium">
              {productOnDisplay.priceData?.currency}
            </h2>
            <h2 className="text-2xl text-gray-500 font-medium">
              {productOnDisplay.priceData?.price}
            </h2>
          </div>
        )}

        <div className="bg-gray-100 h-[2px]" />

        {productOnDisplay.variants && productOnDisplay.productOptions ? (
          <CustomizedProducts
            productId={productOnDisplay._id!}
            variants={productOnDisplay.variants!}
            // variants={updatedVariants!}
            productOptions={productOnDisplay.productOptions!}
          />
        ) : (
          <Add
            productId={productOnDisplay._id!}
            variantId="00000000-000000-000000-000000000001"
            stockNumber={productOnDisplay.stock?.quantity || 0}
          />
        )}
        <div className="bg-gray-100 h-[2px]" />
        {productOnDisplay.additionalInfoSections?.map(function (section: any) {
          return (
            <div className="text-sm" key={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <p>{section.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SinglePage;
