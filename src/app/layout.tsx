import { cn, constructMetaData } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "grainy min-h-screen font-sans antialiased",
            inter.className,
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
