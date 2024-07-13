import { Button } from "@mui/material";
import {AccountCircle,Menu, Close} from '@mui/icons-material';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthNav = ({navStatus}) => {
  const [showNav, setShowNav] = useState(true)
  const userId = useSelector((state)=> state.auth.userId)
  const toggleMenu = ()=>{
    setShowNav(()=>!showNav)
  }
  const navClass = `flex flex-col sticky top-0 z-50 transition-all duration-500 ease-in-out bg-slate-900 ${showNav?"w-[15vw]":"w-[3vw]"}  h-screen text-white`
  return (
    <div className={navClass}>
      <div className="flex flex-row-reverse">
        <Button 
        onClick={toggleMenu}
        >
          {showNav?<Close/>:<Menu/>}  
        </Button>
      </div>
      <div>
        <Link to={`profile/${userId}`}>
        Profiole
        <AccountCircle/>
        </Link>
      </div>
      <Link to={"/home"}>
        Home
      </Link>
    </div>
  )
}
export default AuthNav;