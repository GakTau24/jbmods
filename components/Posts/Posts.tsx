"use client";
import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { Post } from "@prisma/client";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchData();
  }, []);

  const formatViews = (views: any) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "k";
    }
    return views.toString();
  };

  const handlePostClick = async (slug: string) => {
    try {
      await axios.put(`/api/posts/${slug}`);
      setPosts((prevPosts: any) =>
        prevPosts.map((post: Post) =>
          post.slug === slug ? { ...post, views: post.views + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error updating post views:", error);
    }
  };

  return (
    <div className="bg-slate-400 lg:mx-60 max-sm:mx-2 rounded-md">
      {posts.map((post: any) => (
        <div key={post.id} className="pt-3">
          <div className="flex justify-start items-center pb-3">
            <div className="w-full bg-slate-700 text-white px-3 lg:mx-10 max-sm:mx-3 rounded-xl shadow-2xl">
              <h1 className="text-xl font-bold py-2">
                <Link href={`/post/[slug]`} as={`/post/${post.slug}`} passHref>
                  <button
                    className="post-link"
                    onClick={() => handlePostClick(post.slug)}>
                    {post.title}
                  </button>
                </Link>
              </h1>
              <p className="text-sm">Author: {post.author.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-right">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <BsEye className="mr-1" />
                  {formatViews(post.views)} views
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
