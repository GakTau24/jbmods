import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex justify-center items-center flex-col lg:mx-20 max-sm:mx-1 lg:my-10 py-6 gap-2 rounded-xl shadow-xl">
      <div className="max-sm:w-full max-sm:px-2">
        <Skeleton height={100} />
      </div>

      <article>
        <h1 className="text-xl font-bold text-center">
          <Skeleton width={200} />
        </h1>
        <div className="w-full lg:px-10 max-sm:px-3 py-3 whitespace-pre-line">
          <Skeleton />
        </div>
      </article>
      <p className="text-right w-full lg:px-10 max-sm:px-3">
        <Skeleton />
      </p>
      <p className="text-right w-full lg:px-10 max-sm:px-3">
        <Skeleton />
      </p>
    </div>
  );
}
