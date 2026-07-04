"use client"
import LeftVideoCard from './LeftVideoCard';
import { Clock } from 'lucide-react';
import React, { useEffect, useState } from "react";
import RightSection from './RightSection';
import { useUser } from '@/lib/AuthContext';
import axiosInstance from '@/lib/axiosInstance';

const LikedVideosContent = () => {
    const [loading, setLoading] = useState(true);
    const [likedVideos, setLikedVideos] = useState<any[]>([]);
    const {user}= useUser()

    useEffect(() => {
      if (user) {
        loadLikedVideos();
      }
    }, [user]);

    const loadLikedVideos = async () => {
      if (!user) return;
      try {
        const res = await axiosInstance.get(`/like/${user?._id}`);
        setLikedVideos(res.data.likedVideo);
      } catch (error) {
        console.error("Error loading liked videos:", error);
      } finally {
        setLoading(false);
      }
    };
    const handleRemoveLikedVideo = async (likedVideoId: string) => {
      try {
        setLikedVideos((prevLikedVideos) =>
          prevLikedVideos.filter((item) => item._id !== likedVideoId),
        );
      } catch (error) {
        console.error("Error removing liked video:", error);
      }
    };
    if (!user) {
      return (
        <>
          <Clock />
          <h2>Please log in to view your liked videos.</h2>
        </>
      );
    }
    if (loading) {
      return <div>Loading liked videos...</div>;
    }
    if (likedVideos.length === 0) {
      return <div className='p-5'>You have no liked videos.</div>;
    }
  return (
      <div className="md:grid md:grid-cols-3 gap-3 min-h-[60vh] md:min-h-screen w-full">
        <div className="col-span-1 md:my-auto w-full">
          <LeftVideoCard user={user} likedVideo={likedVideos} />
        </div>
        <div className="col-span-2">
            <RightSection likedVideos={likedVideos} />
        </div>
      </div>
  );
}

export default LikedVideosContent