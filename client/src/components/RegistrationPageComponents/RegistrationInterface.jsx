import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { registerReq } from "../../services/Apis";

const RegistrationInterface = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) setEmailError("Invalid Email format");
    else setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError) {
      alert("Please correct the errors in the form");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await registerReq(userData);
      console.log("User registration successful", response.data);
      swal
        .fire({
          title: "Success ",
          text: response.data,
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(() => navigate("/login"));
    } catch (error) {
      console.log("Error during registration", error);
      swal.fire({
        title: "Error ",
        text: error,
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
        />

        <TextField
          variant="outlined"
          label="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          variant="outlined"
          label="Password"
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
          Register
        </Button>
        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link
            className="font-medium text-keppel-600 hover:underline"
            to={"/login"}
          >
            Login Here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationInterface;
