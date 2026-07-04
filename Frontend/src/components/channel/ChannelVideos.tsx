import React from "react";
import VideoCard from "../home/VideoCard";
import RelatedVideos from "../watch/RelatedVideos";

const ChannelVideos = ({ videos }: { videos: any[] }) => {
  if (videos.length === 0) {
    return <p>No videos uploaded yet.</p>;
  }
  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-bold mb-4">Videos</h2>
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ChannelVideos;
