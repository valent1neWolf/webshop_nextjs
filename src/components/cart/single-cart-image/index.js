import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function SingleCartImage({ item }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [item]);

  return (
    <>
      {loading && <Skeleton className="w-24 h-24" />}{" "}
      <Image
        src={item?.images[0] ? item?.images[0] : item?.thumbnail}
        alt={item?.title}
        width={96}
        height={96}
        loader={({ src }) => src}
        quality={60}
        priority
        className={`w-24 h-24 object-contain cursor-pointer ${
          loading ? "hidden" : ""
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  );
}
