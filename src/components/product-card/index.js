"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import AddToCartButton from "@/components/add-to-cart-button";

import SingleCardImage from "./single-card-image";

export default function ProductCard({ item }) {
  const router = useRouter();
  return (
    <Card className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent>
        <div
          className="w-full aspect-w-16 aspect-h-8 lg:h-56 cursor-pointer relative"
          style={{ minHeight: "200px" }}
          onClick={() => router.push(`${item?.id}`)}
        >
          <SingleCardImage item={item} />
        </div>
        <div className="py-3 max-h-50 ">
          <CardTitle
            className="text-lg font-bold text-grey-900 truncate pb-2 hover:underline cursor-pointer"
            onClick={() => router.push(`${item?.id}`)}
          >
            {item.title}
          </CardTitle>
          <CardDescription style={{ height: "90px" }}>
            {item.description.length > 100
              ? item.description.substring(0, 100) + "..."
              : item.description}
          </CardDescription>
        </div>
        <div className="flex text-gray-800 font-semibold justify-between items-center mt-5">
          <div>{item.price} &euro; </div>
          <AddToCartButton productItem={item} />
        </div>
      </CardContent>
    </Card>
  );
}
