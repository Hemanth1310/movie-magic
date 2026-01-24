import { useAuth } from "../../contexts/AuthContext"


const Header = () => {
  const {userData} = useAuth()
  return (
    <div className="flex-1 w-screen h-20 bg-brand-primary flex items-center justify-center fixed top-0 left-0 z-100 shadow-md">
      <div className="container w-full flex items-center justify-between">
        <div className="flex items-center font-bold text-brand-secondary text-2xl">
          <span className="material-symbols-outlined brand-icon">
            local_activity
          </span>
          MovieMagic
        </div>
        <div>
          {userData?  <span className="material-symbols-outlined acc-icon">
            account_circle
          </span>:
          <button className="font-bold text-neutral-100 text-xl">Sign In</button>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Header