"use client"
import { useAuth } from '@/contexts';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useLayoutEffect } from 'react';
interface ProtectedRouteProps {
    children: ReactNode;
    allowedDept:any;
    allowedPos:any;

    // Define any other props you want to pass
  }
export default function ProtectedRoute({ children,allowedDept,allowedPos } : ProtectedRouteProps) {
  const router = useRouter();
  const {user} = useAuth();
  // Add your RBAC checks here
  useEffect(() => {
    console.log(allowedDept)
    const next = allowedDept.some((item: number | undefined) => item === user?.dept.dept_id) && allowedPos.some((item: number | undefined) => item === user?.position.position_id);

    console.log(next);
    if (!next){
        router.push('/dashboard')
    }
  }, []);

  return <>{children}</>;
}

// export default ProtectedRoute;