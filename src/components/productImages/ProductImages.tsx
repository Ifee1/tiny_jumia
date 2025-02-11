"use client";

import Image from "next/image";
import React, { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-close-up-of-wedding-veil-and-high-heels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/2285500/pexels-photo-2285500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/3389419/pexels-photo-3389419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/27113450/pexels-photo-27113450/free-photo-of-white-high-heels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function ProductImages() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={images[index].url}
          sizes="30vw"
          className="object-cover rounded-md "
          fill
          alt=""
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map(function (image, i) {
          return (
            <div
              className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
              key={image.id}
              onClick={() => setIndex(i)}
            >
              <Image
                src={image.url}
                sizes="30vw"
                className="object-cover rounded-md "
                fill
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductImages;
