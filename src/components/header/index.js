"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginAction, logoutAction } from "@/actions";
import { useSelector } from "react-redux";
export default function Header({ getSession }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [authStatus, setAuthStatus] = useState(
    getSession?.user ? "loggedIn" : "loggedOut"
  );
  const cart = useSelector((state) => state.cart); //ajánlott minél specifikusabban megadni a state-t, hogy elkerüljük a felesleges rerendereket

  useEffect(() => {
    setTotalAmount(cart?.cartItems.reduce((acc, item) => acc + item.price, 0)); //we use reduce to sum all the prices of the items in the cart, where acc is the accumulator and item is the current item in the array
    setCartItems(cart?.cartItems.length); //we use the length property to get the number of items in the cart
  }, [cart?.cartItems]);

  // console.log(cartItems, "header");
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) {
      setIsVisible(true); // Scrolling up, show header
    } else {
      setIsVisible(false); // Scrolling down, hide header
    }
    setLastScrollY(currentScrollY); // Update last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  async function handleOauthSignIn() {
    await loginAction();
    setAuthStatus("loggedIn");
  }

  async function handleOauthSignOut() {
    await logoutAction();
    setAuthStatus("loggedOut");
  }

  useEffect(() => {
    if (authStatus === "loggedOut") {
      setCartItems(0);
      setTotalAmount(0);
    }
  }, [authStatus]);

  return (
    <>
      <div className="py-4 px-4 mb-4 bg-white min-h-[70px] tracking-wide z-40"></div>
      <header
        className={`flex shadow-md py-4 px-4 bg-white min-h-[70px] tracking-wide z-50 fixed top-0 left-0 right-0 transition-transform duration-500 ${
          isVisible ? "transform translateY-0" : "transform -translate-y-full"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <Link href="/">
            <img src="/images/logo2.png" className="max-h-14" />
          </Link>
        </div>

        <ul className="flex gap-6 items-center justify-between mr-7">
          <li>
            <Link
              className="font-semibold p-2 hover:bg-gray-100 rounded-xl"
              href="/"
            >
              Home
            </Link>
          </li>
          <li className=" min-w-max flex ">
            <Link
              className="flex font-semibold py-2 hover:bg-gray-100 rounded-xl px-2"
              href="/cart"
            >
              <img src="/cart.svg" className="-top-0.5 relative mr-1" />
              {cartItems > 0 && cartItems ? (
                <sup className=" relative -left-1 top-0.5">
                  <span className="bg-red-600 px-1.5 py-0.5 rounded-full text-white">
                    {cartItems}
                  </span>
                </sup>
              ) : null}
              {totalAmount.toFixed(2)} &euro;
            </Link>
          </li>
        </ul>

        <div className="flex space-x-3 items-center justify-center">
          <form
            action={getSession?.user ? handleOauthSignOut : handleOauthSignIn}
          >
            <Button type="submit">
              {getSession?.user ? "Sign Out" : "Sign In"}
            </Button>
          </form>
        </div>
      </header>
    </>
  );
}
