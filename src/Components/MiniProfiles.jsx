"use client";

import { signOut, useSession } from "next-auth/react";
import Spninner from "./Spninner";
import { useRouter } from "next/navigation";

const MiniProfiles = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <Spninner />;
  }

  const user = session?.data?.user;
  const userName = user?.name;
  const userImg = user?.image;

  return (
    <div className="flex items-center justify-between mt-14 ml-10 mb-6">
      <img
        onClick={() => router.push("/UserProfile")}
        className="w-14 h-14 rounded-full border p-[2px] cursor-pointer"
        src={userImg}
        alt=""
      />

      <div className="flex-1 mx-4 ">
        <h2 onClick={() => router.push("/UserProfile")} className="font-bold cursor-pointer">
          {userName}
        </h2>
        <h3 className="text-sm cursor-default">Good day!</h3>
      </div>

      {session.status === "authenticated" && (
        <button onClick={signOut} className="text-red-400 text-sm font-semibold">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default MiniProfiles;

// <button
//   onClick={() => {
//     signIn("google");
//   }}
//   className="text-blue-400 text-sm font-semibold"
// >
//   Log In
// </button>
