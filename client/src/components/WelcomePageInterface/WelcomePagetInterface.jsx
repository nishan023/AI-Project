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
import axios from "axios";
import { Newspaper } from "@mui/icons-material";

const WelcomePagetInterface = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth);
  console.log(userData);
  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn);
      Swal.fire({
        title: "Error ",
        text: "User Logged Out",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => navigate("/"));
    }
  }, [isLoggedIn, navigate]);

  const logout = () => {
    dispatch(logoutReducer());
    localStorage.clear("access_token");
    navigate("/");
  };

  return (
    <div>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
      <div className="text-gray-50">
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
      <Button variant="contained" onClick={logout}>
        Blogs
      </Button>
    </div>
  );
};

export default WelcomePagetInterface;
