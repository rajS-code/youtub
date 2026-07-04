import React, { useRef } from "react";

const VideoPlayer = ({ video }: any) => {
  // const videos = "/video/vdo.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="w-full aspect-video bg-black overflow-hidden rounded-lg">
      <video ref={videoRef} controls className="object-cover">
        <source src={`${process.env.BACKEND_URL}/${video?.filepath}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
