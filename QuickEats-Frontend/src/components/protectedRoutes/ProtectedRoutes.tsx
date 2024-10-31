import { useUserStore } from "@/store/userStore"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children} : {children: ReactNode}) => {
  const {isAuthenticated, user} = useUserStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  } 
 
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes