import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b border-zinc-300 bg-white py-2  dark:bg-gray-950 ">
        <div className="mx-auto m-2 flex h-full items-center justify-between gap-2 px-10">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white md:block">
              Dashboard
            </p>
          </Link>
          <div className="flex items-center">
            {/* <ThemeToggle className="mr-4" />
            <UserAccountNav user={user} /> */}
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
