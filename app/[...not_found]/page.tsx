import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `404 Not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="max-w-md mx-auto text-center items-center justify-center">
        <h1 className="text-4xl font-bold text-sky-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-sky-400">Oops!</span> Page Not Found
        </h2>
        <p className="mb-6">
          Sorry, we couldnt find the page you were looking for. Verify the URL
          what you entered is correct.
        </p>
        <Link
          href={"/"}
          className="inline-block bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-300 ease-in-out">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}

export default page;
