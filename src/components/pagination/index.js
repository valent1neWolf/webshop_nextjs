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
    <Pagination className="pb-5">
      {maxPages && maxPages > 0 ? (
        <PaginationContent>
          <PaginationItem
            className={currentPage === 1 ? disabledClass : "cursor-pointer"}
            onClick={() =>
              currentPage > 1 && changeCurrentPage(currentPage - 1)
            }
          >
            <PaginationPrevious />
          </PaginationItem>
          {Array.from({ length: maxPages }, (_, i) => (
            <PaginationItem
              key={i}
              className="cursor-pointer"
              onClick={() => changeCurrentPage(i + 1)}
            >
              <PaginationLink isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            className={
              currentPage === maxPages ? disabledClass : "cursor-pointer"
            }
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
