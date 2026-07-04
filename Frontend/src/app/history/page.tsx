import HistoryCategoryTab from "@/components/history/HistoryCategoryTab";
import HistoryContent from "@/components/history/HistoryContent";
import HistoryOptions from "@/components/history/HistoryOptions";
import React, { Suspense } from "react";

const page = ({ isopen }: { isopen: boolean }) => {
  return (
    <div className="w-full py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">Watch History</h1>
      <HistoryCategoryTab />

      <Suspense fallback={<div>Loading history...</div>}>
      <div className="md:grid md:grid-cols-2 gap-6 mt-4">
        <HistoryContent/>
        <HistoryOptions/>
      </div>
      </Suspense>
    </div>
  );
};

export default page;
