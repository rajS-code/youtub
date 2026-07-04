"use client"

import React, { useEffect, useState } from "react";
import VideoCard from "@/components/home/VideoCard";
import axiosInstance from "@/lib/axiosInstance";

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axiosInstance.get("/video/getall");
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  return (
    <div className="w-full grid gap-4 p-4 grid-cols-1 md:grid-cols-3">
      {loading ? (
        <>loading...</>
      ) : (
        videos?.map((video: { _id: any; }) => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
};
export default VideoGrid;
