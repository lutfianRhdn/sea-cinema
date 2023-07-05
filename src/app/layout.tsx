'use client'
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
config.autoAddCss = false;


const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'SEA movie',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className}  bg-gray-100`} suppressHydrationWarning={true}  >
        <SessionProvider >
          <Navbar />
          <main className="mx-[4rem] my-4">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}