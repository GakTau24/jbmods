"use client";
import { motion } from "framer-motion";

export default function Modal({ setShowModal, handleDeleteClick }: any) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="border-0 rounded-lg shadow-lg relative bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-200 flex flex-col w-full outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h1 className="text-xl font-semibold text-white">
                  Confirm deletion
                </h1>
                <button
                  className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}>
                  <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-white text-lg leading-relaxed">
                  Are you sure you want to delete this posts?
                </p>
              </div>
              <div className="flex justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-sky-400 text-white active:bg-sky-600 hover:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white active:bg-red-600 hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    handleDeleteClick();
                    setShowModal(false);
                  }}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </motion.div>
    </>
  );
}
