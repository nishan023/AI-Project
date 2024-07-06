import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../services/ApiCall";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../redux/authSlice";
import Swal from "sweetalert2";
import { Email } from "@mui/icons-material";
import { userDataReq } from "../../services/Apis";


const WelcomePagetInterface = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const gmailLogin = useSelector((state)=> state.auth.gmailLogin)
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
    const token = localStorage.getItem("access_token")
    const userData =  userDataReq();

  }, [isLoggedIn]);


  const logout=()=>{
    dispatch(logoutReducer());
    gmailLogin?localStorage.clear("google_access_token"):localStorage.clear("access_token");
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
