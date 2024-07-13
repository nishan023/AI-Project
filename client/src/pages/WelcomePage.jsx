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
  const { token, setToken } = useContext(AuthContext);
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          Welcome, {userData.username}
        </h1>
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      </header>
      <main className="container mx-auto py-8">
        <div className="text-gray-900 mb-8">
          <p className="text-xl">Username: {userData.username}</p>
          <p className="text-xl">Email: {userData.email}</p>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/blogs")}
        >
          Create Blogs
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "10px" }}
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </Button>
        <div className="flex mt-8">
          <TextField
            variant="outlined"
            label="Search by Tag"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginLeft: "10px" }}
          >
            Search
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {Array.isArray(blogPosts) &&
            blogPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex flex-wrap mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 text-sm mb-4 ">
                  Posted by {post.user.username}
                </p>

                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginLeft: "15px" }}
                  onClick={() => deletePost(post._id)}
                  className="absolute bottom-4 right-4"
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
