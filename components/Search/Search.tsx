"use client"
import { useState } from "react";
import axios from "axios";
import { Post } from "@prisma/client";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/posts?search=${searchTerm}`);
      const searchResults = response.data.posts;
      setSearchResults(searchResults);
      setSearched(true);
      console.log(searchResults);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <div className="flex items-end justify-end flex-col lg:mx-10">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded shadow-xl bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600 shadow-xl"
        >
          Search
        </button>
      </div>
      <div className="mt-4 flex justify-start items-start w-56 mx-20 my-3 flex-col">
        <ul>
          {searched && searchResults.length === 0 ? (
            <li>No results</li>
          ) : (
            searchResults.map((post: Post) => (
              <li key={post.id}>
                <div className="bg-blue-500 p-3 shadow-xl">
                  <hr />
                  <p>{post.title}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchInput;
