"use client";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

function NotFound({ slug }) {
  useEffect(() => {
    document.title = `${slug} Not Found - ${process.env.NEXT_PUBLIC_SITE_NAME}`;
  }, [slug]);
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <div className="max-w-md mx-auto text-center items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-blue-500">Oops! {slug}</span> Not Found
        </h2>
        <p className="mb-6">
          Sorry, we couldnt find the page you were looking for. Verify the URL
          what you entered is correct.
        </p>
        <Link
          href={"/"}
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
          Return to Home Page
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFound;
