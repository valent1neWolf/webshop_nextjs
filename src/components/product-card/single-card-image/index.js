"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function SingleCardImage({ item }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Skeleton className="w-full h-full" />}{" "}
      <Image
        src={item?.thumbnail}
        alt={item?.title}
        loader={({ src }) => src}
        className={`object-contain cursor-pointer object-top ${
          loading ? "hidden" : ""
        }`}
        onLoadingComplete={() => setLoading(false)}
        layout="responsive"
        width={500}
        height={280}
        priority
      />
    </>
  );
}
