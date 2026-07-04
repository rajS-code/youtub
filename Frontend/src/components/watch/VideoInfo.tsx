import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  ArrowDownToLine,
  Astroid,
  Clock,
  Ellipsis,
  Ghost,
  Share,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";

const VideoInfo = ({ video, setVideo }: any) => {
  const { user } = useUser();
  const [likes, setLikes] = useState(video?.Like || 0);
  const [dislikes, setDislikes] = useState(video?.Dislike || 0);
  const [views, setViews] = useState(video?.views || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    setLikes(video?.Like || 0);
    setDislikes(video?.Dislike || 0);
    setIsLiked(false);
    setIsDisliked(false);
  }, [video]);

  const hasViewed = useRef(false);
  useEffect(() => {
    const handleViews = async () => {
      try {
        await axiosInstance.post(
          user ? `/history/${video._id}` : `/history/views/${video._id}`,
          { userId: user?._id },
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (video?._id && !hasViewed.current) {
      hasViewed.current = true;
      handleViews();
      setViews(views);
    }
  }, [video?._id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.Liked) {
        setLikes((prev: any) => prev + 1);
        setIsLiked(true);
        if (isDisliked) {
          setDislikes((prev: any) => prev - 1);
          setIsDisliked(false);
        }
      } else {
        setLikes((prev: any) => prev - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchLater = async () => {
    try {
      const res = await axiosInstance.post(`/watchLater/${video._id}`, {
        userId: user?._id,
      });
      if (res.data.watchLater) {
        setIsWatchLater(!isWatchLater);
      } else {
        setIsWatchLater(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.post(`/like/${video._id}`, {
        userId: user?._id,
      });
      if (!res.data.Liked) {
        setDislikes((prev: any) => prev - 1);
        setIsDisliked(false);
      } else {
        setDislikes((prev: any) => prev + 1);
        setIsDisliked(true);
        if (isLiked) {
          setLikes((prev: any) => prev - 1);
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-2">
      <h1 className="font-font1 font-bold text-3xl">{video?.videotitle}</h1>
      <div className="flex md:flex-row flex-col-reverse  md:items-center md:justify-between mt-2">
        <div className="flex items-center w-full lg:gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback>{video?.videochannel[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-between w-full">
          <div className="flex flex-col text-sm">
            <span className="text-lg font-font1 font-bold">
              {video?.videochannel}
            </span>
            <span className="text-gray-600">1.1M Subscribers</span>
          </div>
          <Button className="ml-4 py-2 px-3 rounded-full">Subscribe</Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          <div className="flex">
            <Button onClick={handleLike} className="py-2 px-3 rounded-l-full">
              <ThumbsUp /> {likes}
            </Button>
            <Button
              onClick={handleDislike}
              className="py-2 px-3 rounded-r-full">
              <ThumbsDown />
            </Button>
          </div>
          <Button
            className="hidden lg:flex py-2 px-3 rounded-full"
            onClick={handleDislike}>
            <Share /> Share
          </Button>
          <Button
            variant={isWatchLater ? `ghost` : "default"}
            onClick={handleWatchLater}
            className={`py-2 px-3 rounded-full ${isWatchLater ? "text-primary" : " "}`}>
            <Clock /> {isWatchLater ? "Saved" : "Watch Later"}
          </Button>
          <Button className="py-2 px-3 hidden lg:flex rounded-full">
            <ArrowDownToLine /> Download
          </Button>
          <Button className="py-2 px-3 rounded-full">
            <Ellipsis />
          </Button>
        </div>
      </div>
      {/* <div className="mt-4">
        <p className={`w-full text-sm ${showFullDescription ? "" : "line-clamp-3"} wrap-normal`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim facere unde impedit cumque nihil fugiat sed optio harum a, tenetur autem, inventore dignissimos nemo ducimus.
        </p>
        <Button
          className="mt-2 py-2 px-3 rounded-full"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Show Less" : "Show More"}
        </Button>
      </div> */}
      <div className="mt-2 p-3 bg-gray-300 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">
            {views
              .toLocaleString("en", {
                notation: "compact",
                compactDisplay: "short",
              })
              .toLowerCase()}{" "}
            views &bull; 1hr ago
          </p>
        </div>
        <div className="relative w-full mt-2">
          <p
            className={`text-sm transition-all duration-300 ${
              showFullDescription ? "" : "line-clamp-2"
            }`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            rem facilis cum repudiandae eligendi eius, nam est nobis explicabo,
            totam dolor ipsum error minima eum. Enim facere unde impedit cumque
            nihil fugiat sed optio harum a, tenetur autem, inventore dignissimos
            nemo ducimus. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Doloribus rem facilis cum repudiandae eligendi eius, nam est
            nobis explicabo, totam dolor ipsum error minima eum. Enim facere
            unde impedit cumque nihil fugiat sed optio harum a, tenetur autem,
            inventore dignissimos nemo ducimus.
          </p>
          {/* {!showFullDescription && (
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-5/6 bg-linear-to-t from-white to-transparent" />
          )} */}
        </div>
        <h2
          className="text-sm font-medium text-blue-600 mt-2 cursor-pointer"
          onClick={() => setShowFullDescription(!showFullDescription)}>
          {showFullDescription ? "Show Less" : "Show More"}
        </h2>
      </div>
    </div>
  );
};

export default VideoInfo;
