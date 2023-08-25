"use client";
import React, { Suspense, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import PaginationControls from "./PaginationPosts";
import LoadingPosts from "./LoadingPosts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true)

  const PAGE_SIZE = 25;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        setPosts(response.data.posts);
        setTotalPages(Math.ceil(response.data.totalPosts / PAGE_SIZE));
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(true)
        setPosts([]);
      }
    };

    fetchData();
  }, [currentPage]);

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
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  if(isLoading) {
    <LoadingPosts />
  }

  return (
    <motion.div
    className="bg-opacity-25 bg-slate-400 backdrop-blur-md lg:mx-60 max-sm:mx-2 rounded-md"
    >
    {posts.length == 0 ? (
      <LoadingPosts />
    ) : (
    posts.map((post: any) => (
      <InView key={post.id}>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            
            className="pt-3">
            <div className="flex justify-start items-center pb-3">
              <motion.div
                className="w-full bg-slate-700 backdrop-blur-md text-white px-3 lg:mx-10 max-sm:mx-3 rounded-xl shadow-2xl"
                whileHover={{ scale: 1.02 }}>
                <h1 className="text-xl font-bold py-2">
                  <Link
                    href={`/post/[slug]`}
                    as={`/post/${post.slug}`}
                    passHref>
                    <button
                      className="post-link"
                      onClick={() => handlePostClick(post.slug)}>
                      <span className=" hover:text-gray-400">
                          {post.title }
                      </span>
                    </button>
                  </Link>
                </h1>
                <p className="text-sm">
                    {post.author.name}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-right">
                      {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center">
                    <BsEye className="mr-1" />
                      {formatViews(post.views)}{" "}
                    views
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </InView>
    ))
    )}
    <div className="flex justify-center items-center py-4">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  </motion.div>
  );
};

export default Posts;
