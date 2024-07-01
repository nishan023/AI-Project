import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const Nav = () => {
  return (
    <Link to="/register">
      <Button variant="contained">Register</Button>
    </Link>
  );
};

export default Nav;
