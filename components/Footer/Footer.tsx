import Link from "next/link";
import React from "react";

function Footer() {
  const time = new Date().getFullYear()
  return (
    <footer className="text-center lg:text-left">
      <div className="p-4 text-center bg-slate-800 text-slate-300">
        © {time} Copyright:
        <Link
          className="bg-slate-800 text-slate-300"
          href="/">
          Tailwind Elements
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
