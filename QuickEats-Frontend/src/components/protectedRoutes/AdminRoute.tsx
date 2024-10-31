import { useUserStore } from "@/store/userStore"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const AdminRoute = ({children}: {children: ReactNode}) => {
  const {user, isAuthenticated} = useUserStore()
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }
  
  return (
    <div>
      {children}
    </div>
  )
}

export default AdminRoute