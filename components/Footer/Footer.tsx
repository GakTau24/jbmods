import Link from "next/link";
import React from "react";

function Footer() {
  const time = new Date().getFullYear()
  return (
    <footer className="text-center lg:text-left shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <div className="p-4 text-center">
        © {time} Copyright:
        <Link
          className=""
          href="/">
          JB Mods
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
