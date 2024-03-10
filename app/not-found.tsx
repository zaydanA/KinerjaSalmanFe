"use client";
import { useAPI, useAuth } from '@/contexts';
import Link from 'next/link'
import { useEffect } from 'react';
 
export default function NotFound() {
  const { user } = useAuth();
  const { navigateToSSO } = useAPI();
  
  // console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     navigateToSSO();
  //   }
  // }, []);

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}