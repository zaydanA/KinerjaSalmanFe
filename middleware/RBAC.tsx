import { IUserSelfData } from '@/types/user';
import { useRouter } from 'next/router'
// import { ROUTES } from 'src/shared'

function hasRequiredPermissions(allowedPosition: number[],allowedDept:number[],user:IUserSelfData|null): boolean {
  // get userPermissions from the redux-store
  const userPermissions = ['users', 'groups', 'home']
  var next = allowedPosition.some(item => item === user?.position.position_id);
  next = allowedDept.some(item => item === user?.position.position_id);

  
  return (
    next
  )
  
}

export function withRoles(Component: any, allowedPosition: number[],allowedDept:number[],user:IUserSelfData|null) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter()
    const hasPermission = hasRequiredPermissions(allowedPosition,allowedDept,user)
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push("/dashboard")
      return null
    }
  }
}