import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import AuthContext from "../services/AuthContext";
import { logoutReducer } from "../redux/authSlice";
import axios from "axios";

const WelcomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {token,setToken} = useContext(AuthContext)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const access_token = localStorage.getItem("access_token");
  const [comment, setComment] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Error",
        text: "User Logged Out",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => navigate("/"));
    }
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/blog", {
          headers: {
            Authorization: access_token,
          },
        });
        console.log(response.data.data);
        setBlogPosts(response.data.data);
        setComment(response.data.data.comments.comment);
      } catch (err) {
        Swal.fire({
          title: "Error ",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    fetchData();
  }, [isLoggedIn, navigate]);

  const logout = () => {
    dispatch(logoutReducer());
    localStorage.clear("access_token");
    navigate("/");
  };

  const deletePost = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:5001/api/blog/${id}`,
        {
          headers: {
            Authorization: access_token,
          },
        }
      );

      if (response.status.toString().startsWith("2")) {
        Swal.fire({
          title: "Success ",
          text: response.data.data,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (err) {
      Swal.fire({
        title: "Error ",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSearch = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/tags?tags=${searchTag}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        setBlogPosts(response.data.data);
      } catch (err) {
        Swal.fire({
          title: "Error ",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    fetchData();
  };

  return (
    <div>
      <Button 
        variant="contained"
        onClick={logout}>Logout
      </Button>
      <div className="text-gray-50">
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default WelcomePage;
