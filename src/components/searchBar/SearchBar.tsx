"use client";

import { SearchData } from "@/app/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchBar() {
  const router = useRouter();
  const [formData, setFormData] = useState<SearchData>({
    name: "",
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.name) {
      router.push(`/list?name=${formData.name}`);
    }
  }
  return (
    <form
      action=""
      className="flex items-center justify-between bg-gray-100 p-2 gap-4 rounded-lg flex-1"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="search"
        name="name"
        onChange={(e) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: e.target.value,
          }))
        }
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image height={16} width={16} alt="" src="/search.png" />
      </button>
    </form>
  );
}

export default SearchBar;
