"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";

const SearchPage = ({ searchParams }) => {
  const { q } = searchParams;
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!q) {
      router.push("/");
    }
    const getData = async () => {
      const response = await axios.get(`/api/posts/search?q=${q}`);
      const result = response.data.posts;
      setPosts(result);
    };
    getData();
  }, [q]);

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
    <motion.div className="bg-opacity-25 lg:mx-60 max-sm:mx-2 rounded-md lg:py-5">
      {posts.length == 0 ? (
        <h1>Posts Not Found</h1>
      ) : (
        posts.map((post: any) => (
          <InView key={post.id}>
            {({ inView, ref }) => (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pt-3"
              >
                <div className="flex justify-start items-center pb-3">
                  <motion.div
                    className="w-full bg-white backdrop-blur-md bg-opacity-25 px-3 lg:mx-10 max-sm:mx-3 rounded-xl shadow-md hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href={`/post/[slug]`}
                      as={`/post/${post.slug}`}
                      passHref
                      onClick={() => handlePostClick(post.slug)}
                    >
                      <span className="">
                        <h1 className="text-xl font-bold py-2">{post.title}</h1>
                        <div className="flex gap-1">
                          <Image
                            src={post.authorPic}
                            width={25}
                            height={25}
                            alt=""
                            className="rounded-full"
                          />
                          <p className="text-sm">{post.author.name}</p>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <p className="text-sm text-right">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                          <div className="flex items-center">
                            <BsEye className="mr-1" />
                            {formatViews(post.views)} views
                          </div>
                        </div>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </InView>
        ))
      )}
    </motion.div>
  );
};

export default SearchPage;
