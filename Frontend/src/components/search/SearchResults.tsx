import axiosInstance from "@/lib/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchResults = ({ query }: any) => {
  if (!query.trim()) {
    return (
      <div className="text-gray-500 w-full text-center">
        "No search results found."
      </div>
    );
  }

  const [videos, setVideos] = useState<any[]>([]);

  const fetchSearchResults = async () => {

    const res = await axiosInstance.get("/video/getall"); 

    let results = res.data.filter(
      (video:any) =>
        video.videotitle?.toLowerCase().includes(query.toLowerCase()) ||
        video.videochannel?.toLowerCase().includes(query.toLowerCase()),
    );
    setVideos(results);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  const hasResults = videos ? videos.length > 0 : 0;

  if (!hasResults) {
    return (
      <div className="text-gray-500 w-full text-center">
        "No search results found."
      </div>
    );
  }

  if (!videos) {
    return (
      <div className="text-gray-500 w-full text-center">
        "No search results found."
      </div>
    );
  }
  return (
    <div className="w-full mt-4 flex flex-col gap-4">
      {videos.length > 0 &&
        videos.map((video: any) => (
          <Link
            key={video._id || video.id}
            href={`/watch/${video._id}`}
            className="w-full h-28 md:h-42 flex gap-4 items-start p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            <video
              src={`${process.env.BACKEND_URL}/${video?.filepath}`}
              className="h-full object-cover rounded-lg"
            />
            <div className="h-full flex items-start justify-between w-full">
              <div className="h-full flex flex-col gap-1">
                <h3 className="text-xl font-semibold line-clamp-1">
                  {video.videotitle}
                </h3>
                <p className="text-md text-gray-600">{video.videochannel}</p>
                <p className="text-md text-gray-600">
                  {video.views?.toLocaleString("en", {
                    notation: "compact",
                  })}{" "}
                  views
                </p>
                <p className="text-sm self-baseline text-gray-800 line-clamp-2">
                  {video.described}
                </p>
              </div>
              <MoreVertical />
            </div>
          </Link>
        ))}
    </div>
  );
};

export default SearchResults;
