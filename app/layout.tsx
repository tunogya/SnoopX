import type {Metadata} from "next";
import "tailwindcss/tailwind.css";
import {ReactNode} from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SnoopX",
  description: "",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full bg-white`}>
    <body className={"h-full overscroll-behavior-x-none overflow-x-hidden overflow-y-hidden overscroll-behavior-y-none"}>{children}</body>
    </html>
  );
}
