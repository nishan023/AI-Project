import { Button } from "@mui/material";
import { AccountCircleOutlined, Menu, Close, HomeOutlined } from '@mui/icons-material';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthNav = ({ navStatus }) => {
  const [showNav, setShowNav] = useState(false)
  const userId = useSelector((state) => state.auth.userId)
  const toggleMenu = () => {
    setShowNav(() => !showNav)
  }

  const location = useLocation()

  const navClass = `pt-3 flex flex-col sticky top-0 relative z-50 transition-all duration-500 ease-in-out bg-black ${showNav ? "w-[15vw]" : "w-[4vw]"}  h-screen text-white`
  return (

    
    <div className={navClass}>
      <div className="flex flex-row-reverse">
        <Button
          onClick={toggleMenu}
        >
          {showNav ? <Close /> : <Menu />}
        </Button>
      </div>

      <div className="flex flex-col items-center flex-grow pt-8 gap-2">
        <Link to={`profile`}>
          <div className={`text-2xl  ${location.pathname=='/profile'?"border-b-4": ""}  duration-100 px-2`}>
            {showNav ? "Profile" : (
              <AccountCircleOutlined className={` transition-opacity text-[30px] ease-out duration-500 opacity-0 ${showNav ? "" : "opacity-100"}`} />
            )}
          </ div>
        </Link>
        <Link to={"/home"}>
          <div className={` text-2xl transition-colors duration-500 ${location.pathname=='/home'?"border-b-4": ""}  duration-100 px-2`}>
            {showNav?"Home":<HomeOutlined className="text-[30px]"/>}
          </div>
        </Link>
      </div>

    <div className="flex h-16 bg-black z-[100] text-white felx items-center justify-center">
        {showNav?<span>Copyright &copy; 2024</span>:"2024"}
    </div>
    </div>

  )
}
export default AuthNav;