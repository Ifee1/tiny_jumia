"use client";

import { UpdatedVariant } from "@/app/types/types";
import { products } from "@wix/stores";
import React, { useState } from "react";

function CustomizedProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  // variants: products.Variant[];
  variants: UpdatedVariant[];
  productOptions: products.ProductOption[];
}) {
  // console.log(productOptions);
  // productOptions.forEach((option) => {
  //   console.log(option.name, option.choices);
  // });

  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string;
  }>({});

  function isVariantAvailabale(choices: { [key: string]: string }) {
    // return variants.some((variant) => {
    //   const variantChoices = variant.choices;
    //   if (!variantChoices) return false;
    //   return (
    //     Object.entries(choices).every(
    //       ([key, value]) => variantChoices[key] === value
    //     ) && variantChoices?.inStock
    //   );
    // });
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) && variant.stock.inStock // <-- FIXED HERE
      );
    });
  }

  function handleOptionSelect(optionType: string, choices: string) {
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [optionType]: choices,
    }));
  }

  // console.log(selectedOption);

  return (
    <div className="flex flex-col gap-4">
      {productOptions.map(function (option) {
        return (
          <div className="flex flex-col gap-6" key={option.name}>
            {/* PRODUCT COLOR */}
            <h4 className="font-medium">Choose a {option.name}</h4>
            {option.choices?.map(function (choice) {
              const disabled = !isVariantAvailabale({
                ...selectedOption,
                [option.name!]: choice.description!,
              });
              console.log("Choice:", choice.description, "Disabled:", disabled);
              // console.log("Variant List", variants);
              const selected =
                selectedOption[option.name!] === choice.description!;
              // console.log(disabled);
              return (
                <div
                  className={`cursor-pointer ${
                    disabled ? "text-gray-400 cursor-not-allowed" : "text-black"
                  }`}
                  key={choice.value}
                  onClick={() =>
                    !disabled &&
                    handleOptionSelect(option.name!, choice.description!)
                  }
                >
                  {choice.description} {selected && "selected"}
                </div>
              );
            })}
            {/* <h4 className="font-medium">Choose a {option.name}</h4>
            <ul className="flex items-center gap-3">
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
                <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </li>
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
              <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
                <div className="absolute w-10 h-[2px] bg-red-400 rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </li>
            </ul> */}

            {/* <h4 className="font-medium">Choose a size</h4>
        <ul className="flex items-center gap-3">
          <li className="ring-1 ring-cartColor text-cartColor rounded-md py-1 px-4 text-sm cursor-pointer">
            Small
          </li>
          <li className="ring-1 ring-cartColor text-white bg-cartColor rounded-md py-1 px-4 text-sm cursor-pointer">
            Medium
          </li>
          <li className="ring-1 ring-pink-300 bg-pink-300 text-white rounded-md py-1 px-4 text-sm cursor-not-allowed ">
            Large
          </li>
        </ul> */}
          </div>
        );
      })}
    </div>
  );
}

export default CustomizedProducts;
