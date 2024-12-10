import { useUserStore } from '@/store/userStore';
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

const AuthenticatedUser = ({children}: {children: ReactNode}) => {
  const {user} = useUserStore();
  if(user && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthenticatedUser