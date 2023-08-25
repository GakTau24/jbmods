"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type props = {
  title: string;
};

export default function AlertsCreatePosts({ title }: props) {
  const [showAlert, setShowAlert] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);
      const percentage = (remainingTime / 3000) * 100;
      setProgress(percentage);
    };

    const startTime = Date.now();
    const interval = setInterval(updateProgress, 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!showAlert) {
      window.location.replace("/dashboard");
    }
  }, [showAlert]);

  if (!showAlert) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="bg-slate-100 relative px-4 py-3 shadow-md rounded-b">
        <div
          className="absolute top-0 left-0 bg-teal-500 h-1"
          style={{ width: `${progress}%` }}></div>
        <div className="flex items-center">
          <motion.svg
            className="h-6 w-6 text-teal-500 mr-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}>
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></motion.path>
          </motion.svg>
          <div>
            <p className="font-bold text-teal-900">Success</p>
            <p className="text-sm text-teal-900">
              You have successfully created posts {title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
