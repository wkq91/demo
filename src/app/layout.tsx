import { AppHeader } from "@/components/AppHeader";
import { ReduxProvider } from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sharestix",
  description: "Sharestix Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {/* <RemInit /> */}

          <AppHeader />

          <Toaster />

          <div className="pt-[70px] flex flex-col items-stretch sm:items-center">
            <div className="sm:w-[600px] md:w-[720px] lg:w-[1000px] xl:w-[1200px] 2xl:w-[1480px] ">
              {children}
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
