"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CartModal from "../cartModal/CartModal";
import { useWixClient } from "@/hooks/useWixClient";

function NavbarIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = false;

  function handleProfile() {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen(!isProfileOpen);
  }

  function handleCart() {
    setIsCartOpen(!isCartOpen);
  }

  // WIX-MANAGED LOGIN
  const wixClient = useWixClient();

  // async function wixLogin() {
  //   const wixLoginRequest = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000/"
  //   );
  //   // console.log(wixLoginRequest)
  //   localStorage.setItem("wixLogin", JSON.stringify(wixLoginRequest));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(wixLoginRequest);
  //   window.location.href = authUrl;
  // }
  return (
    <div className="flex items-center xl:gap-6 gap-4 relative">
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm  2 z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image
        className="cursor-pointer"
        height={22}
        width={22}
        alt=""
        src="/profile.png"
        // onClick={wixLogin}
        onClick={handleProfile}
      />

      <Image
        className="cursor-pointer"
        height={22}
        width={22}
        alt=""
        src="/notification.png"
      />
      <div className="relative cursor-pointer" onClick={handleCart}>
        <Image height={22} width={22} alt="" src="/cart.png" />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-cartColor rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}

export default NavbarIcons;
