import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Register from "../../pages/Register";


const Nav=()=>{
    return(
        <Link to="/register">
        <Button variant="contained">Register</Button>
        </Link>
    )
}

export default Nav;