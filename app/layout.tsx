import type {Metadata} from "next";
import {ReactNode} from "react";
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';
import Script from 'next/script';
import './styles/globals.css';
import type { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SnoopX",
  description: "",
};
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

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
