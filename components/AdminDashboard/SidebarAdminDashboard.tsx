"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Sidebar() {
  const router = usePathname();
  console.log(router);
  
  const activeLink = "block p-2 rounded hover:bg-sky-400 bg-sky-400 font-bold"; 
  const nonActiveLink = "block p-2 rounded";

  return (
    <>
      <div className="w-[10rem]">
        <div className="p-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}>
            <h1 className="text-xl font-bold mb-4">
              JB <span className="text-blue-500">Mods</span>
            </h1>
          </motion.div>
          <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-20" />
          <ul className="space-y-2">
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/panel"}
                  className={router === "/dashboard/admin/panel" ? activeLink : nonActiveLink}
                  >
                  Home
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/panel/users"}
                  className={router === "/dashboard/admin/panel/users" ? activeLink : nonActiveLink}>
                  Users
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/panel/posts"}
                  className={router === "/dashboard/admin/posts" ? activeLink : nonActiveLink}>
                  Posts
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;