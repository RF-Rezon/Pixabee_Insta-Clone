import { Inter } from "next/font/google";
import AuthProvider from "../Components/AuthProvider/AuthProvider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PixaBee",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <AuthProvider>
          <body className={inter.className}>{children}</body>
        </AuthProvider>
    </html>
  );
}
