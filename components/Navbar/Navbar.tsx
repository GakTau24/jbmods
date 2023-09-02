import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = ({ isDarkMode, handleToggleMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = usePathname();
  const id = session?.user.id;
  const users = session?.user.role;
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <motion.nav
      ref={navbarRef}
      className="flex p-4 shadow-lg lg:justify-between rounded-b-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Link href="/" className="text-xl font-semibold">
        JB <span className="text-blue-500">Mods</span>
      </Link>
      <div className="lg:mx-10 flex gap-5 items-center ml-auto mx-10">
        <button onClick={handleToggleMode} className="lg:mx-3">
          {isDarkMode ? (
            <BsFillMoonFill size={20} color="black" />
          ) : (
            <BsFillSunFill size={20} color="white" />
          )}
        </button>
        <div className="max-sm:hidden">
          <Link
            href={"/"}
            className={
              router === "/"
                ? "hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-blue-500"
                : "hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }>
            Home
          </Link>
        </div>
        {session ? (
          <div className="relative max-sm:hidden">
            <div className="flex gap-1">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt=""
                  width={25}
                  height={25}
                  className="w-8 h-8 rounded-full"
                />
              ) : null}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={
                  router === "/dashboard"
                    ? "block px-3 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-sky-600"
                    : "block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
                }>
                <span className="flex">
                  {session.user?.name}
                  <IoMdArrowDropdown />
                </span>
              </button>
            </div>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute mt-2 w-32 border border-slate-700 rounded-md shadow-md bg-slate-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}>
                  <Link
                    href={"/dashboard"}
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm hover:bg-blue-500 hover:rounded text-gray-900">
                    Dashboard
                  </Link>
                  {/* {users == "ADMIN" ? (
                    <Link
                      href={"/dashboard/admin/panel"}
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm hover:bg-blue-500 hover:rounded text-gray-900">
                      Admin
                    </Link>
                  ) : (
                    <></>
                  )} */}
                  <hr className="border-gray-900 opacity-30" />
                  <Link
                    href={`/dashboard/profile/${id}`}
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm hover:bg-blue-500 hover:rounded text-gray-900">
                    Profile
                  </Link>
                  <hr className="border-gray-900 opacity-30" />
                  {session.user.role == "ADMIN" ? (
                    <Link
                      href={`/dashboard/admin/panel/`}
                      className="block px-4 py-2 text-sm hover:bg-blue-500 hover:rounded text-gray-900">
                      Admin
                    </Link>
                  ) : null}
                  <hr className="border-gray-900 opacity-30" />
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:bg-blue-500 hover:rounded text-gray-900 w-full text-left">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="max-sm:hidden">
            <button
              className={
                router === "/login"
                  ? "hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-blue-500"
                  : "hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
              onClick={() => signIn()}>
              Login
            </button>
          </div>
        )}
      </div>
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
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
      </motion.button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden z-10 ${
              menuOpen ? "block" : "hidden"
            } fixed top-0 right-0 w-56 bg-opacity-25 bg-gray-900 backdrop-blur-md h-full `}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}>
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
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
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
                    {users == "ADMIN" ? (
                      <li className="mb-y py-4">
                        <hr className="border-gray-500 opacity-30 w-48" />
                        <Link
                          href={"/dashboard/admin/panel"}
                          onClick={closeDropdown}
                          className="hover:bg-gray-300">
                          Admin
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )}
                    <hr className="border-gray-500 opacity-30 w-48" />
                    <li className="mb-y py-4">
                      <button
                        onClick={handleLogout}
                        className="hover:text-gray-300">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
