"use client"
import { useSession } from 'next-auth/react';
import MiniProfiles from './MiniProfiles';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

const Feed = () => {
   const session = useSession();
  return (
    
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
    <section className={`${session?.status == 'authenticated' ? 'col-span-2 ' : 'col-span-3  max-w-3xl mx-auto'}`}>
      {/* Stories */}
      <Stories />
      {/* Postbox */}
      {/* <PostBox /> */}
      <Posts />
    </section>
    {session.status === 'authenticated' && (
      <section className='col-span-1 hidden xl:inline-grid md:col-span-1 w-full'>
        {/* Mini Profile */}
        <div className='fixed top-15'>
          <MiniProfiles />
          <Suggestions />
        </div>
      </section>
    )}
  </main>
    
  )
}

export default Feed;