import { useEffect } from "react";

import { resetPasswordReq, checkResetLinkReq } from "../../services/Apis";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ResetPasswordInterface() {
  const { id, token } = useParams();
  const navigate = useNavigate();

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
    <section className="bg-gray-50 py-6">
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
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  New Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-keppel-600 focus:ring-keppel-600 focus:border-keppel-600 block w-full p-2.5"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-keppel-600 focus:ring-keppel-600 focus:border-keppel-600 block w-full p-2.5"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
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
