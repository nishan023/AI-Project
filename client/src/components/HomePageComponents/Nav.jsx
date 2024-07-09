import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="flex sticky top-0 z-50 bg-opacity-90 backdrop-blur-2xl bg-slate-950 h-[7vh] items-center px-6">
        <div className="flex-1">
          <Link to="/">
            <Button variant="text">
              LOGO here
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex gap-x-3 flex-row-reverse">
          <Link to="/register">
            <Button variant="contained">Register</Button>
          </Link>
          <Link to='/login'>
            <Button variant="contained">Login</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
