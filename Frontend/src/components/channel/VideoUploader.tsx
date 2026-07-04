"use client";
import { Check, FileVideo, Upload, X } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import axiosInstance from "@/lib/axiosInstance";

const VideoUploader = ({ channelId, channelName }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a valid video file.");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size exceeds 100MB limit.");
        return;
      }
      setVideoFile(file);
      const fileName = file.name;
      if (!videoTitle) {
        setVideoTitle(fileName.substring(0, fileName.lastIndexOf(".")));
      }
    }
  };
  const resetForm = () => {
    setVideoFile(null);
    setVideoTitle("");
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const cancelUpload = () => {
    if (isUploading) {
      toast.error("Upload cancelled.");
    }
  };
  const handleUpload = async () => {
    if (!videoFile || !videoTitle.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("videotitle", videoTitle);
    formData.append("uploader", channelId);
    formData.append("videochannel", channelName);
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const res = await axiosInstance.post("/video/upload", formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });
      toast.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      console.log(error);
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <div className="space-y-4">
        {!videoFile ? (
          <>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-black text-xl">
                Drag and drop your video here
              </p>
              <p className="text-gray-500">or select a file</p>
              <p className="text-gray-500 mt-2">
                mp4, webm, avi or mov &bull; Max size: 100MB
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full border px-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <FileVideo />
                <div>
                  <p className="text-lg font-semibold">{videoFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isUploading && (
                <Button onClick={resetForm} variant="destructive">
                  <X />
                </Button>
              )}
              {uploadComplete && (
                <div>
                  <Check />
                </div>
              )}
            </div>
            <div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>
            </div>
            {isUploading && (
              <>
                <div>
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </>
            )}
            <div className="flex gap-2 justify-end">
              {!uploadComplete && (
                <>
                  <Button onClick={cancelUpload}>Cancel</Button>
                  <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
