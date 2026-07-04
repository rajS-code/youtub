"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const ChannelHeader = ({ channel, user }: { channel: any; user: any }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isJoinedMember, setIsJoinedMember] = useState(false);

  return (
    <div className="h-1/3 w-full">
      <div className="h-full w-full flex items-center gap-6">
        <Avatar className="w-42 h-42 border rounded-full">
          <AvatarFallback className="text-6xl">
            {channel.channelname.charAt(0).toUpperCase()}
            {/* <img src={channel.channelimage} alt="Profile" className="w-48 h-48 border rounded-full" /> */}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold">{channel.channelname}</h1>
          <h2 className="text-sm mt-2 text-gray-500">
            @{channel.email.split("@")[0]} 
            {/* &bull;{" "} */}
            {/* {channel.subscribers.toLocaleString("en", {
              notation: "compact",
              compactDisplay: "short",
            })}{" "}
            subscribers &bull; {channel.videos} videos */}
          </h2>
          <p className="text-gray-500 mt-2">{channel.description}</p>
          {user && user._id === channel._id && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="mt-2">
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsJoinedMember(!isJoinedMember)}
                className="mt-2 ml-4">
                {isJoinedMember ? "Joined" : "Join"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
