import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../services/ApiCall";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../redux/authSlice";
import Swal from "sweetalert2";
import { userDataReq } from "../../services/Apis";
import AuthContext from "../../services/AuthContext";

const WelcomePagetInterface = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {token,setToken} = useContext(AuthContext)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn)
      Swal.fire({
        title: "Error ",
        text: "User Logged Out",
        icon: "error",
        confirmButtonText: "OK",
      }).then(navigate("/"))
    }
    const userData =  userDataReq(token);
    console.log(userData);
    console.log(token);
  }, [isLoggedIn]);


  const logout=()=>{
    dispatch(logoutReducer());
    localStorage.clear("access_token");
    navigate("/");
  }

  return (
    <div>
      <Button 
        variant="contained"
        onClick={logout}>Logout</Button>
    </div>
  );
};

export default WelcomePagetInterface;
