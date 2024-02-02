"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AlertsEditPosts from "@/components/Alert/AlertsEdit";
import { motion } from "framer-motion";

const EditPost = ({ id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/detail/${id}`);
        const data = await response.json();
        setTitle(data.post.title);
        setContent(data.post.content);
        setPicture(data.post.picture);
        setAuthorId(data.post.authorId);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { title, content, picture, authorId };

    try {
      const response = await fetch(`/api/posts/detail/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      {showAlert && (
        <div className="fixed top-[70px] max-sm:top-16 right-4 md:right-1 max-md:h-10 max-md:right-0">
          <AlertsEditPosts title={title} />
        </div>
      )}
      <Link
        href={"/dashboard"}
        className="bg-blue-500 hover:bg-blue-600 flex w-14 p-3 lg:mx-20 max-sm:mx-5 rounded-lg mt-10">
        Back
      </Link>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Edit Posts {title}
      </h2>
      <div className="flex justify-center items-center">
        <div className=" p-4 border border-slate-500 rounded shadow w-full">
          <form onSubmit={handleSubmit} className="py-10">
            <label className="block mb-2">
              Title:
              <input
                className="w-full p-2 border border-slate-500 rounded mt-1 bg-transparent my-5 py-3"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="block mb-2">
              Picture URL:
              <input
                className="w-full p-2 border border-slate-500 rounded mt-1 bg-transparent my-5 py-3"
                type="text"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Content:
              <textarea
                className="w-full p-2 border border-slate-500 rounded mt-1 bg-transparent h-96 my-5 py-3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              type="submit">
              Edit Post
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditPost;
