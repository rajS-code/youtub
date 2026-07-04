import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "../ui/avatar";

const VideoCard = ({ video }: any) => {
  // const videos = "/video/vdo.mp4";

  return (
    <Link
      href={`/watch/${video._id}`}
      className="w-full relative group p-3 rounded-lg">
      <div className="absolute rounded-lg scale-90 inset-0 -z-10 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-gray-300"></div>
      <div className="space-y-3">
        <div className="relative rounded-lg overflow-hidden">
          <video
            src={`${process.env.BACKEND_URL}/${video?.filepath}`}
            className="object-cover rounded-lg"
          />

          <div className="absolute z-10 bottom-2 right-2 text-xs text-white bg-black/80 px-2 py-1 rounded">
            0:10
          </div>
        </div>
        <div className="">
          <div className="w-full flex gap-2 items-center">
            <Avatar size="lg">
              <AvatarFallback>{video?.videochannel[0]}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-medium">{video.videotitle}</h3>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-sm text-gray-600 px-2">{video?.videochannel}</p>
            <p className="text-sm text-gray-600 px-2">
              1k views &bull; 1 hr ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default VideoCard;
