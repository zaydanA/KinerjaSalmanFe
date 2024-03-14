"use client"
import { useAuth } from '@/contexts';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
interface ProtectedRouteProps {
  children: ReactNode;
  allowedDept?: number[];
  allowedPos?: number[];

  // Define any other props you want to pass
}


export default function ProtectedRoute({
  children,
  allowedDept,
  allowedPos 
} : ProtectedRouteProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (allowedPos && !allowedPos.some((item) => item === user?.position.position_id)) {
      router.push('/dashboard');
    } else if (allowedDept && !allowedDept.some((item) => item === user?.dept.dept_id)) {
      router.push('/dashboard');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <>{children}</> : null;
}

// export default ProtectedRoute;