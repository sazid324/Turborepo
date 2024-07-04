"use client";

import logo from "@repo/ui/src/assets/brandings/logo.svg";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { Heart, Search, SearchIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatagoriesDropDown from "./components/HeaderCatagoriesDropDown";
import HeaderDropDownComponent from "./components/HeaderDropDown";
import HeaderSheet from "./components/HeaderSheet";

// Header Logo Component
const HeaderLogo = () => (
  <Link href={"/"}>
    <div className="logo">
      <Image src={logo} alt="logo" width={200} height={100} />
    </div>
  </Link>
);

// Search Component
const SearchBar = () => (
  <div className="search-element flex gap-2 rounded-full border border-orange-500 p-1">
    <input
      type="text"
      placeholder="What are you looking for"
      className="w-full rounded-full border-none ps-4 text-sm font-medium leading-none focus:border-transparent focus:outline-none"
    />
    <Link href={"/products/airjordan"}>
      <div className="search-button mr-[1px] w-max cursor-pointer rounded-full bg-orange-500 px-2 py-1 text-white">
        <Search className="w-4" />
      </div>
    </Link>
  </div>
);

// Auth Buttons Component
const AuthButtons = () => (
  <div className="authentication-button-group cursor-pointer rounded-full border border-orange-500 bg-orange-500 px-5 py-[10px] text-sm font-medium text-white duration-300 hover:bg-transparent hover:text-orange-500">
    <Link href={sharedAppUrls.AUTH.SIGNIN}>Login</Link>/
    <Link href={sharedAppUrls.AUTH.SIGNUP}>Register</Link>
  </div>
);

// Cart and Wishlist Component
const CartWishlist = () => (
  <>
    <Link href={"/cart"}>
      <div className="cart-group relative">
        <div className="cart-number">
          <span className="absolute ml-[11px] mt-[-10px] rounded-full bg-red-600 px-2 text-sm font-[500] text-white">
            2
          </span>
        </div>
        <ShoppingCart className="cursor-pointer" />
      </div>
    </Link>
    <Link href={"/wishlist"}>
      <Heart className="cursor-pointer" />
    </Link>
  </>
);

// Navigation Links Component
const NavLinks = () => (
  <div className="right-part flex gap-6 text-sm font-medium capitalize">
    <Link className="duration-300 hover:text-orange-500" href={"/get-our-app"}>
      Get our app
    </Link>
    <Link className="duration-300 hover:text-orange-500" href={"/about-us"}>
      About Us
    </Link>
    <Link className="duration-300 hover:text-orange-500" href={"/contact"}>
      Contact US
    </Link>
  </div>
);

// Mobile Header Component
const MobileHeader = () => (
  <section className="mobile-header block h-max space-y-2 bg-orange-500 px-4 py-4 font-medium text-white lg:hidden">
    <div className="action-group flex justify-between">
      <div className="logo">
        <h2 className="text-lg font-semibold">Banizzik.com</h2>
      </div>
      <div className="menu-icon">
        <HeaderSheet />
      </div>
    </div>
    <div className="search-section">
      <div className="mobile-search-wrapper flex justify-between rounded-lg bg-white p-1">
        <input
          className="ml-2 w-full border-transparent bg-transparent text-sm leading-none text-black focus:border-none focus:outline-none"
          type="text"
          name="search"
          placeholder="What's in your mind"
        />
        <button className="rounded-sm bg-orange-500 p-1">
          <Link href={"/products/airjordan"}>
            <SearchIcon className="h-[20px] w-[20px]" />
          </Link>
        </button>
      </div>
    </div>
  </section>
);

export default function Header() {
  return (
    <div>
      <section className="relative hidden lg:block">
        <div className="desktop-header border-b">
          <div className="desktop-header-wrapper top-header container flex items-center justify-between py-3 xl:w-[1200px]">
            <div className="left-part flex items-center">
              <HeaderLogo />
            </div>
            <div className="mid-part w-full">
              <SearchBar />
            </div>
            <div className="right-part flex items-center gap-4 pl-6">
              <AuthButtons />
              <CartWishlist />
              <HeaderDropDownComponent />
            </div>
          </div>
          <div className="bottom-header container flex items-center justify-between border-t py-4 xl:w-[1200px]">
            <div className="left-link-group flex items-center gap-6">
              <div
                className="dropdown-menu"
                // onClick={() => setCheckHover(!checkHover)}
              >
                <CatagoriesDropDown />
              </div>
              <Link href={"#"}>
                <p className="flex gap-2 text-sm font-medium duration-300 hover:text-orange-500">
                  Featured Items
                </p>
              </Link>
              <Link href={"#"}>
                <p className="flex gap-2 text-sm font-medium duration-300 hover:text-orange-500">
                  Top Deals
                </p>
              </Link>
            </div>
            <NavLinks />
          </div>
        </div>
      </section>
      <MobileHeader />
    </div>
  );
}
