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
  useLayoutEffect(() => {
    // Example: Check if user has admin role
    var next = allowedDept.some((item: number | undefined ) => item === user?.dept.dept_id);
    next = allowedPos.some((item: number | undefined ) => item === user?.position.position_id);

    if (!next){
        router.push('/dashboard')
    }
  }, []);

  return <>{children}</>;
}

// export default ProtectedRoute;