import SearchPage from "@/components/Posts/SearchPage";
import Search from "@/components/Search/Search";

const page = ({ searchParams }) => {
  return (
    <div className="py-5">
      <Search />
      <SearchPage searchParams={searchParams} />
    </div>
  );
};

export default page;
