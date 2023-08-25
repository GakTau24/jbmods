"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type props = {
  title: string;
};

export default function AlertsEditPosts({ title }: props) {
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
          className="absolute top-0 left-0 bg-yellow-500 h-1"
          style={{ width: `${progress}%` }}></div>
        <div className="flex items-center">
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-6 w-6 text-yellow-500 mr-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18">
            <motion.path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
            <motion.path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
          </motion.svg>
          <div>
            <p className="font-bold text-teal-900">Success</p>
            <p className="text-sm text-teal-900">
              You have successfully edited posts {title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
