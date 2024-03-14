"use client"
import { useAuth } from '@/contexts';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useLayoutEffect } from 'react';
interface ProtectedRouteProps {
    children: ReactNode;
    allowedDept: number[]|any;
    allowedPos:number[];

  }
export default function ProtectedRoute({ children,allowedDept,allowedPos } : ProtectedRouteProps) {
  const router = useRouter();
  const {user} = useAuth();

  useEffect(() => {

    const next = allowedDept.some((item: number | undefined) => item === user?.dept.dept_id) && allowedPos.some((item: number | undefined) => item === user?.position.position_id);

    console.log(next);
    if (!next){
        router.push('/dashboard')
    }
  }, []);

  return <>{children}</>;
}
