import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const RelatedVideos = ({ videos }: any) => {
  
  // const vide = "/video/vdo.mp4";
  return (
    <div>
      {videos.map((video: any) => (
        <Link
          key={video._id || video.id}
          href={`/watch/${video._id}`}
          className="flex gap-4 items-start p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <video
            src={`${process.env.BACKEND_URL}/${video?.filepath}`}
            className="w-40 h-24 object-cover rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium line-clamp-2">
              {video?.videotitle}
            </h3>
            <p className="text-xs text-gray-600">{video.videochannel}</p>
            <p className="text-xs text-gray-600">
              {video?.views.toLocaleString("en", {
                notation: "compact",
              })}{" "}
              views &bull; 1hr ago
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideos;
