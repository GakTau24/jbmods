import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingPosts() {
  const loadingSkeletons = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="pt-5">
      <div className="flex justify-start items-center pb-3">
        <div className="w-full bg-white backdrop-blur-md bg-opacity-25 px-3 lg:mx-10 max-sm:mx-3 rounded-xl shadow-md hover:shadow-xl">
          <h1 className="text-xl font-bold py-2">
            <span className=" hover:text-gray-400">
                <Skeleton width={200} />
            </span>
          </h1>
          <p className="text-sm">
              <Skeleton width={300} />
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-right">
                <Skeleton width={100} />
            </p>
            <div className="flex items-center">
                <Skeleton width={100} />{""}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <>{loadingSkeletons}</>;
}
