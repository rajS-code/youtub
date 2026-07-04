"use client";
import {
  ArrowDownToLine,
  Bookmark,
  Clock,
  ListStart,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";

const HistoryContent = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get(`/history/${user?._id}`);
      setHistory(res.data.historyVideo);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveHistory = async (historyId: string) => {
    try {
      setHistory((prevHistory) =>
        prevHistory.filter((item) => item._id !== historyId),
      );
    } catch (error) {
      console.error("Error removing history item:", error);
    }
  };
  if (!user) {
    return (
      <>
        <Clock />
        <h2>Please log in to view your watch history.</h2>
      </>
    );
  }
  if (loading) {
    return <div>Loading history...</div>;
  }
  if (history.length === 0) {
    return <div>You have no watch history.</div>;
  }

  console.log(history);
  return (
    <div>
      <div>
        <p>{history?.length || 0} videos</p>
        <div className="mt-4">
          {history?.map((item) => (
            <Link
              key={item._id}
              href={`/watch/${item.videoId._id}`}
              className="grid grid-cols-6 gap-2 mb-4 p-2 rounded-lg hover:bg-gray-200">
              <video
                src={`${process.env.BACKEND_URL}/${item?.videoId?.filepath}`}
                className="col-span-2 w-full h-full rounded-lg"
              />
              <div className="col-span-4">
                <div className="flex items-center w-full justify-between text-lg">
                  {item?.videoId.videotitle}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="rounded-full h-10 w-10 hover:bg-gray-300">
                        <MoreVertical className="h-8 w-8" />
                      </Button>
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
                          className="justify-start w-full relative">
                          <Trash2 />
                          Remove from watch history
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-sm text-gray-600">
                  {item?.videoId?.videochannel}
                </span>{" "}
                &bull;{" "}
                <span className="text-sm text-gray-600">
                  {item?.videoId.views
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
    </div>
  );
};

export default HistoryContent;
