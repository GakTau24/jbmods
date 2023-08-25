import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  const time = new Date().getFullYear();
  return (
    <motion.footer
      className="text-center lg:text-left shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="p-4 text-center">
        <span>© {time} Copyright{" "}</span>
        <Link className="" href="/">
          JB Mods
        </Link>
      </div>
    </motion.footer>
  );
}

export default Footer;
