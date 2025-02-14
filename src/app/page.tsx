import CategoryList from "@/components/categoruList/CategoryList";
import ProductList from "@/components/productList/ProductList";
import Slider from "@/components/slider/Slider";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useEffect } from "react";

const HomePage = async () => {
  // useEffect(function () {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   const items = await wixClient.products.queryProducts().find();
  //   console.log(items);
  // };

  // const wixClient = await wixClientServer();
  // const items = await wixClient.products.queryProducts().find();
  // console.log(items);

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">Featured Product</h1>
        <Suspense fallback={"loading..."}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={"loading..."}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  );
};

export default HomePage;
