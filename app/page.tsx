import Posts from "@/components/Posts/Posts";
import SearchInput from "@/components/Search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};

function page() {
  return (
    <>
      <div className="py-5">
        <SearchInput />
        <Posts />
      </div>
    </>
  );
}

export default page;
