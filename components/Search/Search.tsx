"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === "") {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/posts?search=${trimmedSearchTerm}`);
        const searchResults = response.data.posts;
        setSearchResults(searchResults);
        setSearched(true);
      } catch (error) {
        console.error("Error searching posts:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <motion.div
      className="flex items-end justify-end flex-col lg:mx-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="flex items-center space-x-2 px-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded shadow-xl bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
        />
      </div>
      <div className="mt-4 w-56 mx-20 my-3">
        <ul>
          {searched ? (
            searchResults.length === 0 ? (
              <li>No results</li>
            ) : (
              searchResults.map((post: any) => (
                <li key={post.id}>
                  <Link href={`/post/${post.slug}`}>
                    <div className="bg-blue-500 p-3 shadow-xl mb-2 flex justify-between rounded-md">
                      <p className="text-white">{post.title}</p>
                      <p>Author: {post.author.name}</p>
                    </div>
                  </Link>
                </li>
              ))
            )
          ) : null}
        </ul>
      </div>
    </motion.div>
  );
}

export default SearchInput;
