"use client";
import SearchResults from "@/components/search/SearchResults";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const page = () => {
    const searchParams = useSearchParams();

    const q = searchParams.get("q");

  return (
    <div className="p-4 w-full max-w-screen mx-auto">
      <div>
        {q && (
          <div>
            <h1 className="text-2xl font-bold">Search Results for: {q}</h1>
          </div>
        )}
      </div>
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults query={q || ""} />
      </Suspense>
    </div>
  );
};

export default page;
