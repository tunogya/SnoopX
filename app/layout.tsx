import type {Metadata} from "next";
import {ReactNode} from "react";
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SnoopX",
  description: "",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full bg-white`}>
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={"h-full overscroll-behavior-x-none overflow-x-hidden overflow-y-hidden overscroll-behavior-y-none"}>{children}</body>
    </html>
  );
}
