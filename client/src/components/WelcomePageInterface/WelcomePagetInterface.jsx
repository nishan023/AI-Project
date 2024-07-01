import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WelcomePagetInterface = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div>
      <h1>Log In SuccessFully</h1>
    </div>
  );
};

export default WelcomePagetInterface;
