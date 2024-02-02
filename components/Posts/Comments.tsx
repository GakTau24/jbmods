"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

function Comments({ postId }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const authorId = session?.user.id;
  const authorPic = session?.user.image;

  const [editCommentId, setEditCommentId] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/comments?postId=${postId}`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    // Same as before
    // ...
  };

  const handleEditClick = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
    setIsEditing(true);
  };

  const handleEditComment = async () => {
    try {
      const response = await axios.put(`/api/posts/comments`, {
        commentId: editCommentId,
        content: editCommentContent,
      });

      if (response.status === 200) {
        // Update the comment locally
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editCommentId
              ? { ...comment, content: editCommentContent }
              : comment
          )
        );

        // Close the edit mode
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteClick = async (commentId) => {
    try {
      const comment = comments.find((comment) => comment.id === commentId);
      if (session && session.user.id === comment?.authorId) {
        await axios.delete(`/api/posts/comments`, {
          data: {
            commentId,
          },
        });
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error("Unauthorized to delete this comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="flex flex-col lg:py-10 lg:px-5">
      <div className="w-full px-10 flex flex-col">
        <h1 className="lg:text-xl py-3">Comments</h1>
        <ul className="my-5 flex flex-col gap-3">
          {comments.map((comment: any) => (
            <li key={comment.id} className="bg-slate-600 px-5 py-2 rounded-md flex gap-5">
              <div className="flex flex-col gap-2">
                <Image src={comment.authorPic} width={50} height={50} alt={comment.author.name} className="rounded-full" />
                <p>{comment.author.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                <p>{comment.content}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                {session && session.user.id === comment.authorId && (
                  <button
                    onClick={() => handleEditClick(comment.id, comment.content)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <BsPencilSquare />
                  </button>
                )}
                {session && session.user.id === comment.authorId && (
                  <button
                    onClick={() => handleDeleteClick(comment.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <BsFillTrashFill />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="border border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none rounded mt-1 bg-transparent"
        ></textarea>
        <button onClick={handleCommentSubmit} className="bg-blue-500 mx-auto p-2 my-3 rounded-md hover:bg-blue-600">Submit</button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-opacity-25 bg-white backdrop-blur-md flex flex-col gap-4 backdrop-filter backdrop-saturate-200 p-4 rounded-md">
            <h2 className="text-center">Edit Comment</h2>
            <textarea
              value={editCommentContent}
              onChange={(e) => setEditCommentContent(e.target.value)}
              rows={4}
              className="border border-violet-600 ring-1 items focus:ring-violet-600 focus:outline-none rounded mt-1 bg-transparent"
            ></textarea>
            <button onClick={handleEditComment} className="bg-blue-500 mx-auto p-2 my-3 rounded-md hover:bg-blue-600">Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
