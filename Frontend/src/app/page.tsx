import CategoryTab from "@/components/home/CategoryTab";
import { Suspense } from "react";
import VideoGrid from "@/components/home/VideoGrid";

export default function Home() {
  return (
    <main className="w-full p-2">
      <CategoryTab />
      <Suspense fallback={<div>Loading videos...</div>}>
        <VideoGrid />
      </Suspense>
    </main>
  );
}
