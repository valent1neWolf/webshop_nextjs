"use client";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function AddToCartButton({ productItem }) {
  const cart = useSelector((state) => state.cart);
  // console.log(cart?.cartItems);
  const dispatch = useDispatch(); //a dispach biztosítja a store-ba való adatok küldését

  function handleAddToCart() {
    dispatch(addToCart(productItem));
  }

  function handleRemoveFromCart() {
    dispatch(removeFromCart(productItem?.id));
  }

  const isInCart =
    productItem && cart?.cartItems.some((item) => item.id === productItem.id);
  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-700 px-2 "
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
  );
}
