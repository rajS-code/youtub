import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Compass,
  History,
  HomeIcon,
  PlaySquare,
  ThumbsUp,
  User,
  VideoIcon,
} from "lucide-react";
import { useUser } from "@/lib/AuthContext";
import ChannelDialog from "../home/ChannelDialog";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { user } = useUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <aside
      className={`transition-all duration-300 overflow-hidden fixed bg-white z-10 md:static ${isOpen ? "w-0 p-0" : "w-64 p-2"} min-h-screen`}>
      <nav className="space-y-1">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <HomeIcon className="h-5 w-5 mr-1" />
            <h3 className="font-font1 text-base">Home</h3>
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <VideoIcon className="h-5 w-5 mr-1" />
            <h3 className="font-font1 text-base">Shorts</h3>
          </Button>
        </Link>
        <div className="border-t-2 pt-2 mt-2">
          <Link href={`/subscription/${user?.id}`}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PlaySquare />
              <h3 className="font-font1 text-base">Subscription</h3>
            </Button>
          </Link>
        </div>
        <div className="border-t-2 pt-2 mt-2">
          <Link href={`/explore/${user?.id}`}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Compass />
              <h3 className="font-font1 text-base">Explore</h3>
            </Button>
          </Link>
        </div>
        {user && (
          <>
            <div className="border-t-2 pt-2 mt-2">
              <Link href="/history">
                <Button variant="ghost" className="w-full justify-start">
                  <History className="w-5 h-5 mr-1" />
                  <h3 className="font-font1 text-base">History</h3>
                </Button>
              </Link>
              <Link href="/like-page">
                <Button variant="ghost" className="w-full justify-start">
                  <ThumbsUp className="w-5 h-5 mr-1" />
                  <h3 className="font-font1 text-base">Liked videos</h3>
                </Button>
              </Link>
              <Link href="/watch-later">
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="w-5 h-5 mr-1" />
                  <h3 className="font-font1 text-base">Watch later</h3>
                </Button>
              </Link>
              {user?.channelname ? (
                <Link href={`/channel/${user?._id}`}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-5 h-5 mr-1" />
                    <h3 className="font-font1 text-base">Your channel</h3>
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="mt-2 bg-gray-100 hover:text-gray-200 w-full justify-start"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <h3 className="w-full text-base text-center text-blue-600 hover:text-black">
                    Create Channel
                  </h3>
                </Button>
              )}
            </div>
          </>
        )}
      </nav>
      <ChannelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mode="create"
      />
    </aside>
  );
};
export default Sidebar;
