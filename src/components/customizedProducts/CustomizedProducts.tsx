"use client";

import { UpdatedVariant } from "@/app/types/types";
import { products } from "@wix/stores";
import React, { useEffect, useState } from "react";
import Add from "../add/Add";

function CustomizedProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) {
  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  // Checking the quanity and variant id and adding to cart
  useEffect(
    function () {
      const variant = variants.find((variant) => {
        const variantChoices = variant.choices;
        if (!variantChoices) return false;

        return Object.entries(selectedOption).every(
          ([key, value]) => variantChoices[key] === value
        );
      });
      setSelectedVariant(variant);
    },
    [selectedOption, variants]
  );

  function isVariantAvailabale(choices: { [key: string]: string }) {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock.quantity &&
        variant.stock.quantity > 0
      );
    });
  }

  function handleOptionSelect(optionType: string, choice: string) {
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [optionType]: choice,
    }));
  }
  // console.log(variants);

  return (
    <div className="flex flex-col gap-4">
      {productOptions.map(function (option) {
        // console.log("optionChoices", option.choices);

        return (
          <div className="flex flex-col gap-6" key={option.name}>
            {/* PRODUCT COLOR */}
            <h4 className="font-medium">Choose a {option.name}</h4>
            <ul className="flex items-center gap-3">
              {option.choices?.map(function (choice) {
                const disabled = !isVariantAvailabale({
                  ...selectedOption,
                  [option.name!]: choice.description!,
                });

                const selected =
                  selectedOption[option.name!] === choice.description;

                const clickFunction = disabled
                  ? undefined
                  : () => handleOptionSelect(option.name!, choice.description!);

                return option.name === "Color" ? (
                  <li
                    className="w-8 h-8 rounded-full ring-1 ring-gray-300  relative"
                    style={{
                      backgroundColor: choice.value,
                      cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    key={option.name}
                    onClick={clickFunction}
                  >
                    {selected && (
                      <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                    {disabled && (
                      <div className="absolute w-10 h-[2px] bg-red-400 rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    )}
                  </li>
                ) : (
                  <li
                    className="ring-1 ring-cartColor text-cartColor rounded-md py-1 px-4 text-sm"
                    style={{
                      backgroundColor: selected
                        ? "#f35c7a"
                        : disabled
                        ? "#fbcfe8"
                        : "#ffffff",
                      color: selected || disabled ? "#ffffff" : "#f35c7a",
                      cursor: disabled ? "not-allowed" : "pointer",
                      boxShadow: disabled ? "none" : "",
                    }}
                    key={option.name}
                    onClick={clickFunction}
                  >
                    {choice.description}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-000000-000000-000000000001"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
}
export default CustomizedProducts;
