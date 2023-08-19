import { useState } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const Navbar = ({ isDarkMode, handleToggleMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = usePathname();

  const closeDropdown = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="flex p-4 shadow-xl lg:justify-between rounded-b-xl">
      <Link href="/" className="text-xl font-semibold">
        JB Mods
      </Link>
      <div className="lg:mx-10 flex gap-5 items-center ml-auto mx-10">
        <button onClick={handleToggleMode} className="lg:mx-3">
          {isDarkMode ? (
            <BsFillMoonFill size={20} color="black" />
          ) : (
            <BsFillSunFill size={20} color="black" />
          )}
        </button>
        <div className="max-sm:hidden">
          <Link
            href={"/"}
            className={
              router === "/"
                ? "hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-sky-400"
                : "hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }>
            Home
          </Link>
        </div>
        {session ? (
          <div className="relative max-sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={
                router === "/dashboard"
                  ? "block px-3 py-2 rounded-md text-sm font-medium bg-sky-400 hover:bg-sky-600"
                  : "block px-3 py-2 rounded-md text-sm font-medium hover:bg-sky-400"
              }>
              <span className="flex">
                Settings
                <IoMdArrowDropdown />
              </span>
            </button>
            {menuOpen && (
              <div className="absolute mt-2 w-32 border border-slate-700 rounded-md shadow-md bg-slate-500">
                <Link
                  href={"/dashboard "}
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-sm hover:bg-sky-400 hover:rounded text-gray-900">
                  Dashboard
                </Link>
                <hr className="border-gray-900 opacity-30" />
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm hover:bg-sky-400 hover:rounded text-gray-900 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-sm:hidden">
            <button
              className={
                router === "/login"
                  ? "hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-sky-400"
                  : "hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
              onClick={() => signIn()}>
              Login
            </button>
          </div>
        )}
      </div>
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}>
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <div
        className={`md:hidden z-10 ${
          menuOpen ? "block" : "hidden"
        } fixed top-0 right-0 w-56 bg-gray-800 h-full transform transition-transform duration-300 ease-in-out`}>
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setMenuOpen(false)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex mt-10">
          <ul className="text-white p-4">
            <li className="my-2 py-2">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <hr className="border-gray-500 opacity-30 w-48" />
            {session ? (
              <>
                <li className="mb-y py-4">
                  <Link href="/dashboard" className="hover:text-gray-300">
                    Dashboard
                  </Link>
                </li>
                <hr className="border-gray-500 opacity-30 w-48" />
                <li className="mb-y py-4">
                  <button onClick={handleLogout} className="hover:text-gray-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mb-y py-2">
                  <Link href={"/login"} className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <hr className="border-gray-500 opacity-30 w-48" />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
