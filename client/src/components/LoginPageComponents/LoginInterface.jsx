import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginReq } from "../../services/Apis";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../redux/authSlice";
import Swal from "sweetalert2";

const LoginInterface = () => {
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      const userData = await loginReq(data);
      console.log(userData,"username login data")
      dispatch(
        loginReducer({
          userId: userData.data._id,
          username: userData.data.username,
          email: userData.data.email,
        })
      );

      console.log(userData.data.access_token)

      localStorage.setItem("access_token",userData.data.access_token);

      Swal.fire({
        title: "Success ",
        text: userData.message,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/welcome-page"));
    } catch (err) {
      Swal.fire({
        title: "Error ",
        text: err,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-50 flex flex-col justify-center h-4/6 rounded-lg space-y-5 p-20 pt-32">
        <TextField
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <TextField
          required
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" type="submit">
          Login
        </Button>

        <Link
          to={"/reset-password"}
          className="text-center underline hover:text-blue-600"
        >
          Forgot password?
        </Link>

          <div className="flex space-x-2">
          <p className="font-light text-gray-500">Don't have an account?</p>
        <Link to={"/register"}>
          <p className="text-center hover:underline font-small text-gray-500">Register here</p>
        </Link>
          </div>
      </div>
    </form>
  );
};

export default LoginInterface;
