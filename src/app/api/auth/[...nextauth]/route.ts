// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   secret: process.env.NEXT_AUTH_SECRET,
// });

// export { authOptions as GET, authOptions as POST };

// Chat gpt code:

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const options = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   secret: process.env.NEXT_AUTH_SECRET,
// };

// export default (req, res) => NextAuth(req, res, options);

// Stack overflow

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/* You shouldn't export authOptions in API route.ts / route.js file.
 This is the cause of error!! */

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
