import Posts from "@/components/Posts/Posts";
import SearchInput from "@/components/Search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
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
