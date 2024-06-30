import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full justify-end flex px-4 gap-4 py-4  font-thin">
      <Link href="/">
        <p>Home</p>
      </Link>
      <Link href="/filterData">
        <p>Data</p>
      </Link>

      <Link href="/login">
        <p>Login</p>
      </Link>
    </div>
  );
};

export default Navbar;
