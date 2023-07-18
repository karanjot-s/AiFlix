import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "./components/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AiFlix - AI Revolution",
  description: "Create and upload AI Video Trailers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-slate-950 text-white`}>
        <UserProvider>
          <div className="px-6 m-auto" style={{ maxWidth: "1000px" }}>
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
