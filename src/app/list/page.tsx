import Filter from "@/components/filter/Filter";
import ProductList from "@/components/productList/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import { collections } from "@wix/stores";
import Image from "next/image";
import React, { Suspense } from "react";

async function ListPage({ searchParams }: { searchParams: any }) {
  const wixClient = await wixClientServer();
  const response = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  // console.log(response);
  return (
    <div className="px-4 md:px-8 lg:pd-16 xl:32 2xl:px-64 ">
      <div className="hidden sm:flex bg-pink-50 px-4  justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 ">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-cartColor w-max text-sm py-3 px-5">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt=""
            sizes="30vw"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Filter />

      <h1 className="text-xl font-semibold">{response.collection?.name}</h1>
      <Suspense fallback={"Loading ..."}>
        <ProductList
          categoryId={
            response.collection?._id || "00000000-000000-000000-000000000001"
          }
          limit={0}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

export default ListPage;

// I have done it here  {productOnDisplay.variants && productOnDisplay.productOptions && (
//           <CustomizedProducts
//             productId={productOnDisplay._id!}
//             variants={updatedVariants!}
//             productOptions={productOnDisplay.productOptions!}
//           />
//         )}. How do i use it here "use client";

// import { products } from "@wix/stores";
// import React, { useState } from "react";

// function CustomizedProducts({
//   productId,
//   variants,
//   productOptions,
// }: {
//   productId: string;
//   variants: products.Variant[];
//   productOptions: products.ProductOption[];
// }) {
//   // console.log(productOptions);
//   // productOptions.forEach((option) => {
//   //   console.log(option.name, option.choices);
//   // });

//   const [selectedOption, setSelectedOption] = useState<{
//     [key: string]: string;
//   }>({});

//   function isVariantAvailabale(choices: { [key: string]: string }) {
//     return variants.some((variant) => {
//       const variantChoices = variant.choices;
//       if (!variantChoices) return false;

//       return (
//         Object.entries(choices).every(
//           ([key, value]) => variantChoices[key] === value
//         ) && variantChoices?.inStock
//       );
//     });
//   }

//   function handleOptionSelect(optionType: string, choices: string) {
//     setSelectedOption((prevSelectedOption) => ({
//       ...prevSelectedOption,
//       [optionType]: choices,
//     }));
//     // setSelectedOption((prevSelectedOption) => {
//     //   const updatedOption = { ...prevSelectedOption, [optionType]: choices };
//     //   console.log(updatedOption);
//     //   return updatedOption;
//     // });
//   }

//   // console.log(selectedOption);

//   return (
//     <div className="flex flex-col gap-4">
//       {productOptions.map(function (option) {
//         return (
//           <div className="flex flex-col gap-6" key={option.name}>
//             {/* PRODUCT COLOR */}
//             <h4 className="font-medium">Choose a {option.name}</h4>
//             {option.choices?.map(function (choice) {
//               const disabled = !isVariantAvailabale({
//                 ...selectedOption,
//                 [option.name!]: choice.description!,
//               });
//               // console.log("Choice:", choice.description, "Disabled:", disabled);
//               // console.log("Variant List", variants);
//               const selected =
//                 selectedOption[option.name!] === choice.description!;
//               // console.log(disabled);
//               return (
//                 <div
//                   className=""
//                   key={choice.value}
//                   onClick={() =>
//                     handleOptionSelect(option.name!, choice.description!)
//                   }
//                 >
//                   {choice.description}
//                   {disabled && "disabled"}
//                   {selected && "selected"}
//                 </div>
//               );
//             })}
//             {/* <h4 className="font-medium">Choose a {option.name}</h4>
//             <ul className="flex items-center gap-3">
//               <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
//                 <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
//               </li>
//               <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
//               <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
//                 <div className="absolute w-10 h-[2px] bg-red-400 rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
//               </li>
//             </ul> */}

//             {/* <h4 className="font-medium">Choose a size</h4>
//         <ul className="flex items-center gap-3">
//           <li className="ring-1 ring-cartColor text-cartColor rounded-md py-1 px-4 text-sm cursor-pointer">
//             Small
//           </li>
//           <li className="ring-1 ring-cartColor text-white bg-cartColor rounded-md py-1 px-4 text-sm cursor-pointer">
//             Medium
//           </li>
//           <li className="ring-1 ring-pink-300 bg-pink-300 text-white rounded-md py-1 px-4 text-sm cursor-not-allowed ">
//             Large
//           </li>
//         </ul> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default CustomizedProducts;
