"use client";

import ChannelHeader from "@/components/channel/ChannelHeader";
import Channeltabs from "@/components/channel/Channeltabs";
import ChannelVideos from "@/components/channel/ChannelVideos";
import VideoUploader from "@/components/channel/VideoUploader";
import { useUser } from "@/lib/AuthContext";
import { notFound, useParams, useRouter } from "next/navigation";
import React from "react";

const page = ({isOpen}: {isOpen: boolean}) => {
  const router = useRouter();
  // const {id} = router.query as {id: string};
  const { user } = useUser();
  
  const {id}= useParams() as {id: string};
  
  try {
    let channel = user;
    if (!channel) {
      notFound();
    }
    const videos = [
      {
        _id: "1",
        videotitle: "Amazing Nature Documentary",
        filename: "nature-doc.mp4",
        filetype: "video/mp4",
        filepath: "/videos/nature-doc.mp4",
        filesize: "500MB",
        videochanel: "Nature Channel",
        like: 1250,
        views: 45000,
        uploader: "nature_lover",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        videotitle: "Cooking Tutorial: Perfect Pasta",
        filename: "pasta-tutorial.mp4",
        filetype: "video/mp4",
        filepath: "/videos/pasta-tutorial.mp4",
        filesize: "300MB",
        videochanel: "Chef's Kitchen",
        like: 890,
        views: 23000,
        uploader: "chef_master",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    return (
      <div className="min-h-screen w-full p-4">
        <ChannelHeader channel={channel} user={user} />
        <Channeltabs/>
        <div className="w-full mt-4">
          <VideoUploader channelId={id} channelName={channel.channelname} />
          {/* <ChannelVideos videos={videos} /> */}
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error loading channel", error);
  }

};

export default page;
