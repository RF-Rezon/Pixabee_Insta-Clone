// "use client"
// import { signIn as SignIntoProvider, getProviders, useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// export default function SignIn() {
//   const { data: session } = useSession();
//   const [providers, setProviders] = useState([]);

//   useEffect(() => {
//     async function fetchProviders() {
//       const fetchedProviders = await getProviders();
//       setProviders(fetchedProviders || []);
//     }

//     fetchProviders();
//   }, []);

//   useEffect(() => {
//     if (session) {
//       window.location.href = '/';
//     }
//   }, [session]);

//   return (
//     <>
//       {providers.map((provider) => (
//         <div key={provider.id}>
//           <button onClick={() => SignIntoProvider(provider.id)}>
//             Sign in with {provider.name}
//           </button>
//         </div>
//       ))}
//     </>
//   );
// }
