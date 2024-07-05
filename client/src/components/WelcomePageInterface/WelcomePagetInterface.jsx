import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../services/ApiCall";
import { Button } from "@mui/material";

const WelcomePagetInterface = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const userData = {
    username,
    email,
  }
  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn)
      navigate("/");
    }
    userData = requestUserData();
  }, [isLoggedIn]);

  const requestUserData= async()=>{
      const userData = await commonRequest("GET",null,null,null);
      return userData;
  }
  return (
    <div>
      <h1>{userData}</h1>
      <Button onClick={lo}>Logout</Button>
    </div>
  );
};

export default WelcomePagetInterface;
