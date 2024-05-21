import type { Metadata } from "next";
import "tailwindcss/tailwind.css";
import {ReactNode} from "react";

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
    <html lang="en" className={"h-full bg-black"}>
      <body className={"h-full"}>{children}</body>
    </html>
  );
}
