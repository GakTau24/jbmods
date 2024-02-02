"use client";
import { useRef, useState } from "react"; // Import useState
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearch = (event) => {
    const search = searchRef.current?.value;
    if (search && search.length >= 3) {
      router.push(`page/search?q=${search}`);
    } else {
      setErrorMessage("Minimum 3 characters");
    }
    event.preventDefault();
  };

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
          ref={searchRef}
          className="border p-2 rounded-xl shadow-xl bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl">Search</button>
      </div>
      {errorMessage && <h1>{errorMessage}</h1>}
    </motion.div>
  );
};

export default Search;
