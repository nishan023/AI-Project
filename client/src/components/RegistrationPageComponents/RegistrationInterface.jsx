import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleUserDataReq, registerReq } from "../../services/Apis";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { GoogleLogin} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../redux/authSlice";

const RegistrationInterface = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password cannot exceed 20 characters")
      .required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema), });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await registerReq(data);
      console.log("User registration successful", response.data);
      Swal.fire({
        title: "Success",
        text: response.data,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/login"));
    } catch (error) {
      console.log("Error during registration", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Registration failed",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleLoginSuccess = async(response)=>{
      console.log("google login sucess",response);
      const token = response.credential;

      try{
        const userData = await googleUserDataReq(token);
        dispatch(
          loginReducer({
            access_token: userData.data.access_token,
            userId: userData.data._id,
            username: userData.data.username,
            email: userData.data.email,
          })
        );
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-slate-50 flex flex-col justify-center h-4/6 rounded-lg space-y-5 p-20 pt-32">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Username"
              type="text"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="E-mail"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
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
          )}
        />

        <Button variant="contained" type="submit">
          Register
        </Button>
        <div>
          <p className="text-center">OR</p>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />

        <p className="text-sm font-light text-gray-500">
          Already have an account?{" "}
          <Link className="font-medium text-keppel-600 hover:underline" to={"/login"}>
            Login Here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationInterface;
