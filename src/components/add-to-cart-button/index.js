"use client";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddToCartButton({ productItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  // console.log(cart?.cartItems);
  const dispatch = useDispatch(); //a dispach biztosítja a store-ba való adatok küldését

  function handleAddToCart() {
    dispatch(addToCart(productItem));
    setIsOpen(true);
  }

  function handleRemoveFromCart() {
    dispatch(removeFromCart(productItem?.id));
  }
  console.log(cart, "add to button");
  const isInCart =
    productItem && cart?.cartItems.some((item) => item.id === productItem.id);

  useEffect(() => {
    setTotalAmount(cart?.cartItems.reduce((acc, item) => acc + item.price, 0)); //we use reduce to sum all the prices of the items in the cart, where acc is the accumulator and item is the current item in the array
  }, [cart?.cartItems]);
  return (
    <>
      <Button
        className="bg-gray-700  px-2 "
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
      >
        <img
          src="/cart-white.svg"
          alt="cart"
          className="-top-0.5 relative mr-2 "
        />
        {cart?.cartItems.some((item) => item.id === productItem.id)
          ? "Remove"
          : "Add to cart"}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl">Cart</SheetTitle>
            <hr className="border-[1px]" />
            <SheetDescription>
              <div
                className="relative h-[400px]  "
                style={{ width: "calc(100% + 10px)" }}
              >
                <ScrollArea className="h-full overflow-y-auto pr-4">
                  {cart?.cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex">
                        <img
                          src={
                            item?.images[0] ? item?.images[0] : item?.thumbnail
                          }
                          alt={item.title}
                          className="w-14 h-14 border-2 border-gray-200 rounded-lg object-contain"
                        />
                        <div className="pl-4 flex flex-col items-start">
                          <p className="text-black font-semibold text-left">
                            {item.title}
                          </p>
                          <p className="text-left">{item.price}</p>
                        </div>
                        <button
                          className="rounded-full w-5 h-5 py-1 px-2 my-0 bg-black text-white flex items-center justify-center ml-auto"
                          onClick={() => dispatch(removeFromCart(item?.id))}
                        >
                          ×
                        </button>
                      </div>
                      <hr className="border-[1px] my-3" />
                    </div>
                  ))}
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-base text-gray-800 font-semibold">Total:</p>
                <p className="text-base text-gray-800 font-semibold">
                  {totalAmount.toFixed(2)} &euro;
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  className="text-gray-800 bg-text-white border-2 border-gray-800 w-1/2 mr-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Continue &nbsp;
                  <span className="hidden  sm:inline"> Shopping</span>
                </Button>
                <Button
                  className=" text-white w-1/2"
                  onClick={() => router.push("/cart")}
                >
                  View Cart
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
