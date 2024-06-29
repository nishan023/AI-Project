import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordReq } from "../../services/Apis";
import Swal from "sweetalert2";

export default function ForgetPasswordInterface() {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    if (data && data.email) {
      try {
        const response = await forgetPasswordReq({ email: data.email });
        console.log(response);
        Swal.fire({
          title: "Success ",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(navigate("/login"));
      } catch (error) {
        Swal.fire({
          title: "Error ",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  return (
    <>
      <section className="bg-gray-900 py-6">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Forget Password
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-keppel-600 focus:ring-keppel-600 focus:border-keppel-600 block w-full p-2.5"
                    placeholder="name@example.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
