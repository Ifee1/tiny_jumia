"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CartModal from "../cartModal/CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";
import { wixClientServer } from "@/lib/wixClientServer";

function NavbarIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const [quantity, setQuantity] = useState(0);

  const { cart, counter, getCart } = useCartStore();

  console.log(cart);
  useEffect(
    function () {
      getCart(wixClient);
    },
    [wixClient, getCart]
  );

  // console.log(isLoggedIn);

  // Temp/test
  // const isLoggedIn = false;

  function handleProfile() {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen(!isProfileOpen);
    }
  }

  function handleCart() {
    setIsCartOpen(!isCartOpen);
  }

  async function handleLogout() {
    setIsLoading(true);
    Cookies.remove("refreshToken");

    const { logoutUrl } = await wixClient.auth.logout(window.location.href);

    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
    console.log(Cookies);
  }

  // WIX-MANAGED LOGIN
  // const wixClient = useWixClient();

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
        <div className="absolute p-4 rounded-md bg-white top-12 left-0 text-sm  2 z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out ..." : "Logout"}
          </div>
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
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}

export default NavbarIcons;
