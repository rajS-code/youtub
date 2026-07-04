import { formatDistanceToNow } from "date-fns";
import { ArrowDownToLine, Clock, EllipsisVertical, Play } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const LeftVideoCard = ({
  user,
  likedVideo,
}: {
  user: any;
  likedVideo: any;
}) => {
  console.log(likedVideo);
  
  return (
    <div className="p-5 w-full flex flex-col gap-2">
      <h3 className="font-font1 text-3xl font-bold my-2 w-full">Liked Videos</h3>
      <p className="text-xl font-semibold">{user?.name}</p>
      <div className="flex gap-4 text-gray-600">
        <span>{likedVideo?.length} videos</span>
      </div>
      <div>
        <Button variant="outline" className="rounded-full h-10 w-10">
          <ArrowDownToLine />
        </Button>
        <Button variant="outline" className="rounded-full h-10 w-10 ml-2">
          <EllipsisVertical />
        </Button>
      </div>
      <Link href={`/watch/${likedVideo[0]?.videoId._id}`} className="w-full">
        <Button variant="outline" className="rounded-full mt-4">
          <Play /> Play
        </Button>
      </Link>
    </div>
  );
};

export default LeftVideoCard;
