"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Image
        onClick={handleOpen}
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/">Home Page</Link>
          <Link href="/">Product Page</Link>
          <Link href="/">Cart Page</Link>
          <Link href="/">Checkout Page</Link>
          <Link href="/">Shipping Page</Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
