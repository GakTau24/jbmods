"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import AlertsCreatePosts from "@/components/Alert/AlertsCreate";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [session, setSession] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`
        );
        setSession(res.data);
        setAuthorId(res.data.user.id.toString());
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      content: content,
      picture: picture,
      authorId: parseInt(authorId),
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setPicture("");
        setAuthorId("");
        setShowAlert(true);
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Link href={"/dashboard"} className="bg-blue-500 hover:bg-blue-600 flex w-14 p-3 lg:mx-20 max-sm:mx-5 rounded-lg mt-10">Back</Link>
      <div className="flex justify-center items-center h-screen">
      {showAlert && (
          <div className="fixed top-[70px] max-sm:top-16 right-0 md:right-1 max-md:h-10 max-md:right-0">
            <AlertsCreatePosts title={title} />
          </div>
        )}
        <div className="max-w-sm mx-auto p-4 border rounded shadow w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Create Post
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Title:
              <input
                className="w-full p-2 border rounded mt-1 bg-transparent"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="block mb-2">
              Picture URL:
              <input
                className="w-full p-2 border rounded mt-1 bg-transparent"
                type="text"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Content:
              <textarea
                className="w-full p-2 border rounded mt-1 bg-transparent h-52"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              type="submit">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
