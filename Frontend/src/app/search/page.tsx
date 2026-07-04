"use client";

import SearchResults from "@/components/search/SearchResults";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <>
      {q && (
        <div>
          <h1 className="text-2xl font-bold">
            Search Results for: {q}
          </h1>
        </div>
      )}

      <SearchResults query={q} />
    </>
  );
}

export default function Page() {
  return (
    <div className="p-4 w-full max-w-screen mx-auto">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}