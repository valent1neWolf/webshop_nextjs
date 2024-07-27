"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
export default function PageCounter({ maxPages }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const disabledClass = "cursor-not-allowed opacity-50";

  function changeCurrentPage(page) {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  }

  return (
    <Pagination className="pb-5 w-full">
      {maxPages && maxPages > 0 ? (
        <PaginationContent className="flex justify-center items-center">
          <PaginationItem
            className={`${
              currentPage === 1 ? disabledClass : "cursor-pointer"
            } block sm:inline-block`}
            onClick={() =>
              currentPage > 1 && changeCurrentPage(currentPage - 1)
            }
          >
            <PaginationPrevious />
          </PaginationItem>
          <span className="block sm:hidden mx-2">{currentPage}</span>
          {Array.from({ length: maxPages }, (_, i) => (
            <PaginationItem
              key={i}
              className="cursor-pointer hidden sm:inline-block"
              onClick={() => changeCurrentPage(i + 1)}
            >
              <PaginationLink isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            className={`${
              currentPage === maxPages ? disabledClass : "cursor-pointer"
            } block sm:inline-block`}
            onClick={() =>
              currentPage < maxPages && changeCurrentPage(currentPage + 1)
            }
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      ) : null}
    </Pagination>
  );
}
