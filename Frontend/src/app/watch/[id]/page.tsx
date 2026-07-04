"use client";
import VideoPlayer from "@/components/watch/VideoPlayer";
import { useEffect, useMemo, useState } from "react";
import VideoInfo from "@/components/watch/VideoInfo";
import Comments from "@/components/watch/Comments";
import RelatedVideos from "@/components/watch/RelatedVideos";
import { useParams } from "next/dist/client/components/navigation";
import axiosInstance from "@/lib/axiosInstance";

const page = ({ isOpen }: { isOpen: boolean }) => {
  const { id } = useParams();

  const [videos, setVideos] = useState([]);
  const [video, setvideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id || typeof id !== "string") return;
      try {
        const res = await axiosInstance.get("/video/getall");
        const video = res.data?.find((vid: any) => vid._id === id);
        const relatedVideos = res.data?.filter((vid: any) => vid._id !== id);
        setvideo(video);
        setVideos(relatedVideos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);
  // const relatedVideos = [
  //   {
  //     _id: "1",
  //     videotitle: "Amazing Nature Documentary",
  //     filename: "nature-doc.mp4",
  //     filetype: "video/mp4",
  //     filepath: "/videos/nature-doc.mp4",
  //     filesize: "500MB",
  //     videochanel: "Nature Channel",
  //     Like: 1250,
  //     Dislike: 20,
  //     views: 45000,
  //     uploader: "nature_lover",
  //     createdAt: new Date().toISOString(),
  //   },
  //   {
  //     _id: "2",
  //     videotitle: "Cooking Tutorial: Perfect Pasta",
  //     filename: "pasta-tutorial.mp4",
  //     filetype: "video/mp4",
  //     filepath: "/videos/pasta-tutorial.mp4",
  //     filesize: "300MB",
  //     videochanel: "Chef's Kitchen",
  //     Like: 890,
  //     Dislike: 15,
  //     views: 23000,
  //     uploader: "chef_master",
  //     createdAt: new Date(Date.now() - 86400000).toISOString(),
  //   },
  // ];

  if (loading) {
    return <div>loading...</div>;
  }

  if (!videos) {
    return <div className="p-4">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <div className={`md:grid ${isOpen ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
          <div
            className={`${isOpen ? "md:col-span-1" : "md:col-span-2"} space-y-3`}>
            <VideoPlayer video={video} />
            <VideoInfo video={video} setvideo={setvideo} />
            <Comments video={video} />
          </div>
          <div className="space-y-3 lg:col-span-1">
            <RelatedVideos videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
