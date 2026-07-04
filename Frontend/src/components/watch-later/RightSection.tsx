import React from "react";
import LikedCategoryTab from "./WatchLaterCategoryTab";
import Link from "next/link";
import {
  ArrowDownToLine,
  Bookmark,
  Clock,
  ListStart,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const RightSection = ({
  watchLaterVideos
}: {
  watchLaterVideos: any
}) => {
  return (
    <div className="p-5">
      <LikedCategoryTab />
      <div className="mt-4">
        {watchLaterVideos?.map((item: any) => (
          <Link
            key={item._id}
            href={`/watch/${item?.videoId?._id}`}
            className="grid grid-cols-6 gap-2 mb-4 p-2 rounded-lg hover:bg-gray-200">
            <video
              src={`${process.env.BACKEND_URL}/${item?.videoId?.filepath}`}
              className="col-span-2 w-full h-full rounded-lg"
            />
            <div className="col-span-4">
              <div className="flex items-center w-full justify-between text-lg">
                {item?.videoId?.videotitle}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    forceMount
                    className="w-60 flex flex-col items-start">
                    <DropdownMenuItem className="w-full">
                      <Button
                        variant="ghost"
                        className="justify-start w-full relative">
                        <ListStart />
                        Add to queue
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full">
                      <Button
                        variant="ghost"
                        className="justify-start w-full relative">
                        <Clock />
                        Save to Watch Later
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full">
                      <Button
                        variant="ghost"
                        className="justify-start w-full relative">
                        <Bookmark />
                        Save to playlist
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full">
                      <Button
                        variant="ghost"
                        className="justify-start w-full relative">
                        <ArrowDownToLine />
                        Download
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full">
                      <Button
                        variant="ghost"
                        className="justify-start w-full relative"
                        >
                        <Trash2 />
                        Remove from watch history
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <span className="text-sm text-gray-600">
                {item?.videoId?.videochanel}
              </span>{" "}
              &bull;{" "}
              <span className="text-sm text-gray-600">
                {item?.videoId?.views
                  .toLocaleString("en", {
                    notation: "compact",
                    compactDisplay: "short",
                  })
                  .toLowerCase()}{" "}
                views
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightSection;
