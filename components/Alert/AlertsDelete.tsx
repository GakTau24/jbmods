"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AlertsDelete({ title }) {
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
      window.location.reload();
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
          className="absolute top-0 left-0 bg-red-500 h-1"
          style={{ width: `${progress}%` }}></div>
        <div className="flex items-center">
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-6 w-6 text-red-500 mr-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20">
            <motion.path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
            />
          </motion.svg>
          <div>
            <p className="font-bold text-teal-900">Success</p>
            <p className="text-sm text-teal-900">
              You have successfully deleted posts {title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
