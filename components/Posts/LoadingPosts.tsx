import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingPosts() {
  return (
    <div className="pt-5">
      <div className="flex justify-start items-center pb-3">
        <div className="w-full bg-slate-700 backdrop-blur-md text-white px-3 lg:mx-10 max-sm:mx-3 rounded-xl shadow-2xl">
          <h1 className="text-xl font-bold py-2">
            <span className=" hover:text-gray-400">
              <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton width={200} />
              </SkeletonTheme>
            </span>
          </h1>
          <p className="text-sm">
            <SkeletonTheme baseColor="#313131" highlightColor="#525252">
              <Skeleton width={300} />
            </SkeletonTheme>
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-right">
              <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton width={100} />
              </SkeletonTheme>
            </p>
            <div className="flex items-center">
              <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton width={100} />
              </SkeletonTheme>{" "}
              views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
