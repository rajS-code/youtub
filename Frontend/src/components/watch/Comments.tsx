import { formatDistanceToNow, set } from "date-fns";
import React, { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

interface VideoComment {
  _id: string;
  videoId: string;
  userId: string;
  commentbody: string;
  usercommented: string;
  commentedon: string;
}

const Comments = ({ video }: any) => {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<any>(null);
  const [editComment, setEditComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    loadComments();
  }, [video]);

  if (loading) return <div>loading comments...</div>;

  const loadComments = async () => {
    try {
      const res = await axiosInstance.get(`/comment/${video._id}`);
      console.log(res.data.commentVideo);

      setComments(res.data.commentVideo);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await axiosInstance.post("/comment/postComment", {
        videoId: video,
        userId: user._id,
        commentbody: newComment,
        usercommented: user.name,
      });
      if (res.data.comment) {
        // const newCommentObj: Comment = {
        //   _id: Date.now().toString(),
        //   videoId: video,
        //   userId: user._id,
        //   commentbody: newComment,
        //   usercommented: user.name || "Unknown User",
        //   commentedon: new Date().toISOString(),
        // };
        setComments((prev) => [res.data.comment, ...prev]);
      }
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: VideoComment) => {
    setEditingCommentId(comment._id);
    setEditComment(comment.commentbody);
  };

  const handleUpdateComment = async () => {
    if (!editComment.trim() || !editingCommentId) return;
    try {
      const res = await axiosInstance.post(
        `/comment/editComment/${editingCommentId}`,
        { commentbody: editComment },
      );
      console.log(res.data);
      
      if (res.data.comment) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === editingCommentId
              ? { ...comment, commentbody: editComment }
              : comment,
          ),
        );
      }
      setEditingCommentId(null);
      setEditComment("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/comment/deleteComment/${id}`);
      if (!res.data.comment) {
        setComments((prev) => prev.filter((comment) => comment._id !== id));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-semibold mb-4 mt-2">
          {comments.length} Comments
        </h2>
        {user && (
          <div className="flex justify-between items-start gap-4 mb-4">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col items-end gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <div>
                <Button
                  onClick={() => setNewComment("")}
                  disabled={!newComment.trim()}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="ml-2">
                  Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {comments.map((comment) => (
        <div className="mb-4" key={comment._id}>
          <div className="flex items-start gap-4 mb-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{comment?.usercommented?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <span className="text-lg font-bold">{comment.usercommented}</span>
              <span className="text-sm ml-2 text-gray-500">
                {formatDistanceToNow(new Date( comment.commentedon))}
              </span>
              {editingCommentId === comment._id ? (
                <div className="w-full flex flex-col items-end mt-2">
                  <Textarea
                    className={cn(
                      "w-full",
                      editingCommentId === comment._id
                        ? "border-blue-500"
                        : "border-gray-300",
                    )}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                  />
                  <div className="mt-2">
                    <Button variant="ghost" onClick={handleUpdateComment}>
                      Save
                    </Button>
                    <Button
                      className="ml-2"
                      variant="ghost"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditComment("");
                      }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full mt-2">
                  <p>{comment.commentbody}</p>
                  {comment.userId === user._id && (
                    <div className="mt-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(comment)}>
                        Edit
                      </Button>
                      <Button
                        className="ml-2"
                        variant="ghost"
                        onClick={() => handleDelete(comment._id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
