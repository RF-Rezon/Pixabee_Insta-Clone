"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import LoaderProvider from ".././LoaderProvider/LoaderProvider";

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
       
        <RecoilRoot>{children}</RecoilRoot>
   
      </SessionProvider>
  );
};

export default AuthProvider;
