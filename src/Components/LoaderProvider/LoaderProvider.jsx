import { useSession } from "next-auth/react";
import LoadingSpninner from "../LoadingSpninner/LoadingSpninner";

const LoaderProvider = ({ children }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <LoadingSpninner>
        {children}
      </LoadingSpninner>
    );
  } 
   return children;
  
};

export default LoaderProvider;
