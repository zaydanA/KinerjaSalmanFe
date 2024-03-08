"use client"
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";
import APIProvider from '@/providers/ApiProvider';
import AuthProvider from '@/providers/AuthProvider';
import { useAPI, useAuth } from '@/contexts';
import { useEffect } from 'react';

// import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 fixed h-screen w-screen`}>
        <APIProvider>
          <AuthProvider>
            <NextUIProvider>
              <div className='h-screen w-screen'>
                {children}
              </div>
            </NextUIProvider>
          </AuthProvider>
        </APIProvider>
      </body>
    </html>
  );
}
