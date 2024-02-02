import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex flex-col py-3 my-5">
      <div className="p-4 rounded-md max-sm:mx-auto lg:mx-20 py-5">
        <div className="pt-3">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-600 text-white">
                <th className="py-2 px-4 text-left">
                  <Skeleton width={100} />
                </th>
                <th className="py-2 px-4 text-left">
                  <Skeleton width={100} />
                </th>
                <th className="py-2 px-4 text-left">
                  <Skeleton width={100} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">
                  <Skeleton width={100} />
                </td>
                <td className="py-2 px-4">
                  <Skeleton width={100} />
                </td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <div className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">
                      <Skeleton width={100} />
                    </div>
                    <div className="bg-red-600 p-2 rounded-md text-white">
                      <Skeleton width={100} />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
