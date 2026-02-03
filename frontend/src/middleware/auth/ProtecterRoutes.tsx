import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const ProtecterRoutes = () => {
  const {userData,isAuthLoading} = useAuth()

  if(isAuthLoading){
    return <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
      </div>
  }

  if(userData){
    return <Outlet/>
  }else{
    return <Navigate to='/' />
  }

  return (
    <div>ProtecterRoutes</div>
  )
}

export default ProtecterRoutes