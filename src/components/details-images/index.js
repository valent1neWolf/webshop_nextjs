"use client";
import { useState, useRef } from "react";

export default function DetailsImages({ detailsData }) {
  const [currentImage, setCurrentImage] = useState(detailsData?.images[0]);
  const [hoverImage, setHoverImage] = useState(null);
  const bracket = "border-2 border-gray-400 rounded-md";

  const handleMouseMove = (e) => {
    const zoomLevel = 2; // Zoom level (2 for 200%)
    const container = e.currentTarget; //megkapom magát a div-t

    const { left, top, width, height } = container.getBoundingClientRect(); //annak is a bal-felső sarkát és a méretét

    // kiszámítjuk az egér pozícióját a containeren belül százalékosan (*100)
    const x = ((e.clientX - left) / width) * 100; //(az egér x pozíciója - a container bal széle / a container szélessége)*100 --> 0 és 100 közötti szám
    const y = ((e.clientY - top) / height) * 100;

    // a megváltozott értékeket beállítjuk a kép transzformációjára
    const img = container.querySelector("img");
    img.style.transformOrigin = `${x}% ${y}%`; // Az egér pozíciója lesz a középpont, ami körül a kép nagyítódik
    img.style.transform = `scale(${zoomLevel})`;
  };

  return (
    <div className="lg:col-span-3 bg-gray-100 w-full lg:sticky top-0 text-center p-8 rounded-md">
      <div
        className="flex justify-center items-center overflow-hidden" // kell az overflow hidden, hogy ne lógjon ki a kép a div-ből
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => {
          // visszaállítjuk a kép transzformációját
          const img = e.currentTarget.querySelector("img");
          img.style.transform = "scale(1)";
          img.style.transformOrigin = "center center";
        }}
      >
        <img
          src={hoverImage ? hoverImage : currentImage}
          alt={detailsData?.title}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            transition: "transform 0.2s ease",
          }}
          className="rounded"
        />
      </div>
      <hr className="border-black border-2 my-6" />
      <div className="flex flex-wrap gap-5 justify-center mx-auto">
        {detailsData && detailsData?.images && detailsData?.images.length > 0
          ? detailsData?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={detailsData?.title}
                className={`"w-24 cursor-pointer max-h-24 object-contain " ${
                  currentImage === image
                    ? bracket
                    : currentImage === detailsData?.images[0] &&
                      image === detailsData.images[0]
                    ? bracket
                    : ""
                }`}
                onClick={() => setCurrentImage(image)}
                onMouseEnter={() => setHoverImage(image)}
                onMouseLeave={() => setHoverImage(null)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
