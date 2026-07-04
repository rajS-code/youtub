import { formatDistanceToNow } from "date-fns";
import { ArrowDownToLine, Clock, EllipsisVertical, Play } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const LeftVideoCard = ({
  user,
  watchLaterVideos,
}: {
  user: any;
  watchLaterVideos: any;
}) => {
  return (
    <div className="p-5 flex flex-col gap-2">
      <h3 className="font-font1 text-3xl font-bold my-2">Watch-later Videos</h3>
      <p className="text-xl font-semibold">{user?.name}</p>
      <div className="flex gap-4 text-gray-600">
        <span>{watchLaterVideos?.length} videos</span>
        
      </div>
      <div>
        <Button variant="outline" className="rounded-full h-10 w-10">
          <ArrowDownToLine />
        </Button>
        <Button variant="outline" className="rounded-full h-10 w-10 ml-2">
          <EllipsisVertical />
        </Button>
      </div>
      <Link href={`/watch/${watchLaterVideos[0]?.videoid?._id}`} className="w-full">
        <Button variant="outline" className="rounded-full mt-4">
          <Play /> Play
        </Button>
      </Link>
    </div>
  );
};

export default LeftVideoCard;
