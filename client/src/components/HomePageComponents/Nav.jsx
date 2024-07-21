import { Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const tenVh = window.innerHeight * 0.1;
      if (window.scrollY > tenVh) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  
  return (
    <>
      <div className={`flex sticky top-0 z-50 transition-all duration-700 ease-in ${isScrolled ? 'backdrop-blur-md bg-blue-950/10' : ''}  h-[10vh] items-center px-10`}>
        <div className="flex-1">
          <Link to="/">
            <Button variant="text">
              LOGO here
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex gap-x-6 flex-row-reverse">
          <Link to="/register">
          <Button
          variant="contained"
            className=" bg-blue-500/80 transition-colors duration-300 hover:bg-white/25  px-4 rounded-full"
          >
              Register
            </Button>
          </Link>
          <Link to='/login'>
            <Button variant="contained"
            className=" bg-blue-500/80 transition-colors duration-300 hover:bg-white/25  px-4 rounded-full">Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
