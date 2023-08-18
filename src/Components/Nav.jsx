"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiPaperAirplane,
} from "react-icons/hi";

import { useRecoilState } from "recoil";
import { modalState } from "./../app/atoms/modalAtom";

const Nav = () => {
  const session = useSession();
  const userImg = session?.data?.user.image;
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center sm:max-w-2xl md:max-w-6xl mx-auto ">
        {/* Left  */}
        <div className="relative">
          <div className="hidden lg:block absolute -top-[68px] h-44 w-44">
            <img src="https://i.ibb.co/G9NgcW9/logo-removebg-preview.png" className="object-contain" alt="Img logo Name" />
          </div>
          <div className="relative lg:hidden h-7 w-7 ml-4">
            <img
              onClick={() => router.push("/")}
              src="https://i.ibb.co/tbMd05z/swarm.png"
              className="object-contain"
              alt="Img logo"
            />
          </div>
        </div>
        {/* Middle  */}
        <div className="max-w-xs ">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 w-full pl-10 sm:text-sm border p-2 border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Right  */}
        <div className="flex items-center justify-end space-x-5 mr-4 md:mr-0">
          <HiOutlineHome onClick={() => router.push("/")} className="navBtn" />

          {session.status === "authenticated" ? (
            <>
              <HiOutlineMenu className="h-6 w-6 md:hidden cursor-pointer" />

              <div className="relative navBtn bottom-1">
                <HiPaperAirplane className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <HiOutlinePlusCircle onClick={() => setOpen(true)} className="navBtn" />
              <HiOutlineUserGroup className="navBtn" />
              <HiOutlineHeart className="navBtn" />
              
                <img onClick={() => router.push("/UserProfile")} src={userImg} alt="" className="h-7 w-7 rounded-full cursor-pointer" />
             
            </>
          ) : (
            <button onClick={() => signIn("google")}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
