import Add from "@/components/add/Add";
import CustomizedProducts from "@/components/customizedProducts/CustomizedProducts";
import ProductImages from "@/components/productImages/ProductImages";
import React from "react";

function SinglePage() {
  return (
    <div className="px-4 md:px-8 lg:pd-16 xl:32 2xl:px-64 flex flex-col lg:flex-row gap-16">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="font-medium text-4xl">Product Name</h1>
        <p className="text-gray-500">Our Product of inestimable value</p>
        <div className="bg-gray-100 h-[2px]" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$90</h3>
          <h2 className="text-2xl text-gray-500 font-medium">$70</h2>
        </div>
        <div className="bg-gray-100 h-[2px]" />
        <CustomizedProducts />
        <Add />
        <div className="bg-gray-100 h-[2px]" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>My awesome product</p>
        </div>
        <div className="bg-gray-100 h-[2px]" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>My awesome product</p>
        </div>
        <div className="bg-gray-100 h-[2px]" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>My awesome product</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
