"use client";
import LeftVideoCard from "./LeftVideoCard";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import RightSection from "./RightSection";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

const WatchLaterVideosContent = () => {
  const [loading, setLoading] = useState(true);
  const [watchLaterVideos, setWatchLaterVideos] = useState<any[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadWatchLaterVideos();
    }
  }, [user]);

  const loadWatchLaterVideos = async () => {
    if (!user) return;
    try {
      const res = await axiosInstance.get(`/watchLater/${user?._id}`); 
      setWatchLaterVideos(res.data.watchLaterVideos);
    } catch (error) {
      console.error("Error loading watch later videos:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveWatchLaterVideo = async (watchLaterVideoId: string) => {
    try {
      setWatchLaterVideos((prevWatchLaterVideos) =>
        prevWatchLaterVideos.filter((item) => item._id !== watchLaterVideoId),
      );
    } catch (error) {
      console.error("Error removing watch later video:", error);
    }
  };
  if (!user) {
    return (
      <>
        <Clock />
        <h2>Please log in to view your watch later videos.</h2>
      </>
    );
  }
  if (loading) {
    return <div>Loading liked videos...</div>;
  }
  if (watchLaterVideos.length === 0) {
    return <div>You have no watch later videos.</div>;
  }
  return (
    <div className="md:grid md:grid-cols-3 gap-3 md:min-h-screen w-full">
      <div className="col-span-1 md:my-auto">
        <LeftVideoCard
          user={user}
          watchLaterVideos={watchLaterVideos}
        />
      </div>
      <div className="col-span-2">
        <RightSection watchLaterVideos={watchLaterVideos} />
      </div>
    </div>
  );
};

export default WatchLaterVideosContent;
