import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path; // that means we are on the client side

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`; //means we are on server and we have deployed on vercel

  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetaData({
  title = "ChatDocu - the SaaS to chat with your PDF.",
  description = "ChatDocu is an open-source software to make chatting to your PDF files easy.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ManishS79882777",
    },
    icons,
    metadataBase: new URL("https://chatdocu.vercel.app/"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
