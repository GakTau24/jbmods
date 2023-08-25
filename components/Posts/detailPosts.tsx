"use client";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import NotFound from "../Handler/NotFound";

function DetailPosts({ slug, posts }) {
  if (posts.length > 0) {
    const post = posts[0];

    const convertLinksToClickable = (text: string) => {
      const urlRegex = /(?:https?|ftp):\/\/[\S]+/g;
      return text.replace(
        urlRegex,
        (url) =>
          `<a href="${url}" target="_blank" class="text-blue-500 hover:text-blue-600">${url}</a>`
      );
    };

    const contentWithClickableLinks = convertLinksToClickable(post.content);

    return (
      <motion.div
        className="flex justify-center items-center flex-col lg:mx-20 max-sm:mx-1 lg:my-10 py-6 gap-2 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {post.picture && post.picture.startsWith("https://") && post.title && (
          <div className="max-sm:w-full max-sm:px-2">
            <Image
              src={post.picture}
              width={500}
              height={500}
              alt={post.title}
              objectFit="cover"
              priority
            />
          </div>
        )}
        <article>
          <h1 className="text-xl font-bold text-center">{post.title}</h1>
          <div
            className="w-full lg:px-10 max-sm:px-3 py-3 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: contentWithClickableLinks }}
            />
        </article>
        <p className="text-right w-full lg:px-10 max-sm:px-3">
          Create: {new Date(post.createdAt).toDateString()}
        </p>
        <p className="text-right w-full lg:px-10 max-sm:px-3">
          Update: {new Date(post.updatedAt).toDateString()}
        </p>
      </motion.div>
    );
  }

  return (
    
    <NotFound slug={slug} />
  );
}

export default DetailPosts;
