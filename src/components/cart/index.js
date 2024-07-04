"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { removeFromCart } from "@/store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems);
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  useEffect(() => {
    setTotalAmount(cart?.cartItems.reduce((acc, item) => acc + item.price, 0)); //we use reduce to sum all the prices of the items in the cart, where acc is the accumulator and item is the current item in the array
  }, [cart?.cartItems]);
  useEffect(() => {
    setTax(totalAmount * 0.1); //we calculate the tax by multiplying the total amount by 0.2
  }, [totalAmount]);
  if (!cart?.cartItems.length) {
    return (
      <div className="flex justify-center items-center ">
        <h2 className="text-xl  p-3 italic">Your cart is empty.</h2>
      </div>
    );
  }

  function handleRemoveFromCart(id) {
    dispatch(removeFromCart(id));
  }

  return (
    <div className="bg-white py-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#333]">Cart</h2>
        <div className="overflow-y-auto">
          <Table className="mt-12 w-full border-collapse divide-y">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="text-left whitespace-nowrap ">
              <TableRow>
                <TableHead className="text-base text-gray-700 p-4 font-bold">
                  Title
                </TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-left whitespace-nowrap divide-y ">
              {cart?.cartItems?.map((item) => (
                <TableRow>
                  <TableCell className="py-5 px-4">
                    <div className="flex items-center gap-6 w-max ">
                      <div
                        className="border-2 border-gray-300 rounded-md  h-24 flex items-center justify-center w-24"
                        onClick={() => router.push(`${item?.id}`)}
                      >
                        <img
                          src={
                            item?.images[0] ? item?.images[0] : item?.thumbnail
                          }
                          alt={item?.title}
                          className="w-24  h-24 object-contain cursor-pointer"
                        />
                      </div>
                      <p
                        className="text-lg cursor-pointer"
                        onClick={() => router.push(`${item?.id}`)}
                      >
                        {item?.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-lg">{item?.price} &euro;</p>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="rounded-3xl  py-1"
                      onClick={() => handleRemoveFromCart(item?.id)}
                    >
                      ×
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <hr className=" border-t-2 border-gray-300" />
        <div className=" sm:w-full md:w-1/2 ml-auto mb-2">
          <div className="flex justify-between items-center mt-5">
            <p className="text-lg">Sub-total: </p>
            <p className="text-lg ">{(totalAmount - tax).toFixed(2)} &euro;</p>
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-lg ">Tax:</p>
            <p className="text-lg ">{tax.toFixed(2)} &euro;</p>
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-lg ">Delivery and duties:</p>
            <p className="text-lg italic">Included</p>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-5">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">
              {totalAmount.toFixed(2)} &euro;
            </p>
          </div>
          <div className="flex justify-end mt-5">
            <Button className="rounded-xl">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
