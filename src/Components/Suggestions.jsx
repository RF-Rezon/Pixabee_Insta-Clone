"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Suggestions = () => {
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

  
  // const displayPartialText = (text)=> {
  //   const words = text.split(' ');
  //   const partialWords = words.slice(0, 15);
  //   const partialText = partialWords.join(' ');
  //   return partialText;
  // }

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5">
        <h3 className="text-sm font-bold text-gray-400 cursor-default">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold text-sm">See All</button>
      </div>
      {
        statement?.results?.slice(0, 8).map((profile) => (
          <div key={profile.name.first} className="flex justify-between items-center mt-3">
            <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.picture.thumbnail} alt="" />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm truncate">{profile.name.title}, {profile.name.first}, {profile.name.last}</h2>
              <h3 className="text-xs text-gray-400">{profile.location.city}, {profile.location.country}</h3>
            </div>

            <button className="text-blue-400 text-xs font-bold">Follow</button>
          </div>
        ))
      }
    </div>
  )
}

export default Suggestions;
