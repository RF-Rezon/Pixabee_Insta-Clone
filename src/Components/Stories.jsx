"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Story from "./Story";

const Stories = () => {
  const [statement, setStatement] = useState([]);
  const session =  useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("https://randomuser.me/api/?results=20", fetcher);
   
  // Use useEffect to update the statement when data is available
  useEffect(() => {
    if (data) {
      setStatement(data);
    }
  }, [data]);

  

  return (
    <div>
      <div className="flex p-6 bg-white mt-8 border-gray-200 border rounded-xl overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        {session?.status === "authenticated" && <Story img={session?.data?.user?.image} name ={session?.data?.user?.name} />}
        {statement?.results?.slice(0, 15).map((user) => (
          <Story key={user.name.first} img={user.picture.large} name={user.name.first}/>
        ))}
      </div>
    </div>
  );
};

export default Stories;
