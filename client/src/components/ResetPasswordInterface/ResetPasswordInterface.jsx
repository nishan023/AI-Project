import { useEffect, useState } from "react";
import { resetPasswordReq, checkResetLinkReq } from "../../services/Apis";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPasswordInterface() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const toggleShowPassword = (setPass,state) => {
    setPass(() => !state);
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 20 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    checkLink();
  }, []);

  const checkLink = async () => {
    try {
      if (id && token) {
        await checkResetLinkReq(id, token);
      }
    } catch (error) {
      Swal.mixin({
        didClose() {
          navigate("/");
        },
      }).fire("Error", error.message);
    }
  };

  async function onSubmit(data) {
    try {
      if (data && data.password && data.confirmPassword && id) {
        const res = await resetPasswordReq(
          {
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
          id
        );
        Swal.mixin({
          didClose() {
            navigate("/login");
          },
        }).fire("Success", res.message);
      }
    } catch (error) {
      Swal.fire("Error", error.message);
    }
  }

  return (
    <section className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Reset Password
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
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
                              onClick={()=>toggleShowPassword(setShowPassword,showPassword)}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Confirm Password"
                      type={showPassword2 ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>toggleShowPassword(setShowPassword2,showPassword2)}
                            >
                              {showPassword2 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
