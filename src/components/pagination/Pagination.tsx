"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

function Pagination({
  currentPage,
  previousPage,
  nextPage,
}: {
  currentPage: number;
  previousPage: boolean;
  nextPage: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function createPageUrl(currentPageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPageNumber.toString());
    replace(`${pathname}? ${params.toString()}`);
  }

  return (
    <div className="flex justify-between mt-12 w-full">
      <button
        className="rounded-md bg-cartColor text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed
       disabled:bg-pink-200"
        disabled={!previousPage}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-cartColor text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed
       disabled:bg-pink-200"
        disabled={!nextPage}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
