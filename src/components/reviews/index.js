"use client";
import Rating from "@/components/rating";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Reviews({ detailsData }) {
  const [lowerScreen, setLowerScreen] = useState("reviews");
  // console.log(lowerScreen);
  return (
    <div>
      <div className="m-0 p-0">
        <Button
          onClick={() => setLowerScreen("reviews")}
          className={`bg-gray-200 text-gray-700 font-bold text-xl hover:bg-gray-300 rounded-none rounded-bl-md border-r-2 border-gray-300 ${
            lowerScreen === "reviews" ? "bg-gray-300" : ""
          }`}
        >
          Reviews
        </Button>
        <Button
          onClick={() => setLowerScreen("description")}
          className={`bg-gray-200 text-gray-700 font-bold text-xl hover:bg-gray-300 rounded-none rounded-br-md border-gray-300 ${
            lowerScreen === "description" ? "bg-gray-300" : ""
          }`}
        >
          Description
        </Button>
      </div>
      {lowerScreen === "reviews" ? (
        <div className="p-6">
          {detailsData?.reviews.map((review, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 my-4">
              <h3 className="text-xl font-semibold">{review?.reviewerName}</h3>
              <Rating rating={review?.rating} />
              <p className="italic">{review?.comment}</p>
              <p className="text-sm font-semibold text-gray-600 pt-2">
                {(() => {
                  return review?.date
                    ? new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "";
                })()}
              </p>
            </div>
          ))}
        </div>
      ) : lowerScreen === "description" ? (
        <div className="p-6">
          <p className="pb-3">{detailsData?.description}</p>
          <Table className="w-full border sm:w-full md:w-1/2 border-gray-200">
            <TableBody>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{detailsData?.brand || "unknown"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell>{detailsData?.weight || "unknown"} g</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Width</TableCell>
                <TableCell>
                  {detailsData?.dimensions?.width || "unknown"} cm
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Heigth</TableCell>
                <TableCell>
                  {detailsData?.dimensions?.height || "unknown"} cm
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Depth</TableCell>
                <TableCell>
                  {detailsData?.dimensions?.depth || "unknown"} cm
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
