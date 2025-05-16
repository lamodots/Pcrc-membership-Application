import { useState } from "react";

import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";

import Button from "../../components/Button/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface ValuesProps {
  email: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const [showPasswordResetSuccessMessage, setShowPasswordResetSuccessMessage] =
    useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleResetPassword = async (
    values: ValuesProps,
    { setSubmitting, resetForm }: FormikHelpers<ValuesProps>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const res = await fetch(`${API_URL}/api/v1/users/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          token,
        }),
      });

      const { msg, message } = await res.json();
      if (!res.ok) {
        return toast.error(msg);
      }
      toast.success(message);
      resetForm();
      setShowPasswordResetSuccessMessage(true);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className=" bg-[#F4F6F7] w-screen flex justify-center items-center  h-screen overflow-hidden">
      <div className="userform max-w-[512px] w-full bg-white px-6 py-8 rounded-lg shadow-lg md:bg-inherit md:rounded-none md:shadow-none">
        {showPasswordResetSuccessMessage ? (
          <div
            role="alert"
            className=" bg-[#0dcaf0] px-6 py-8 border-l-4 border-l-cyan-800 w-full leading-6 mb-8"
          >
            <p>
              Your password has been successfully updated. You can now use your
              new password to log in to your account.
            </p>
          </div>
        ) : (
          <>
            <h1 className=" text-2xl text-[#212529] text-center font-bold">
              Reset A New Password
            </h1>
            <Formik
              validationSchema={resetPasswordSchema}
              initialValues={initialValues}
              onSubmit={handleResetPassword}
            >
              {({
                values,
                errors,
                isSubmitting,
                touched,
                handleChange,
                handleSubmit,
              }) => (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="password flex flex-col gap-2">
                    <Lable label="Email" />
                    <TextInput
                      type="email"
                      placeholderText="Enter email you resgistered with"
                      name="email"
                      value={values.email}
                      handleInputChange={handleChange}
                    />
                    <span className="text-sm text-red-400">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div className="password flex flex-col gap-2">
                    <Lable label="New password" />
                    <TextInput
                      type="password"
                      placeholderText="Enter new password"
                      name="password"
                      value={values.password}
                      handleInputChange={handleChange}
                    />
                    <span className="text-sm text-red-400">
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                  <div className="password flex flex-col gap-2">
                    <Lable label="Confirm new password" />
                    <TextInput
                      type="password"
                      placeholderText="Confirm new password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      handleInputChange={handleChange}
                    />
                    <span className="text-sm text-red-400">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    text="Reset my password"
                    isSubmitting={isSubmitting}
                    disableBtn={isSubmitting}
                  >
                    {isSubmitting && (
                      <Oval
                        visible={true}
                        height="24"
                        width="24"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    )}
                  </Button>
                </form>
              )}
            </Formik>
          </>
        )}

        <p className=" text-center text-base mt-8">
          <Link to="/login" className="text-base  text-[#1A4F83]">
            BACK TO LOGIN
          </Link>
        </p>
      </div>

      {/* <div className=" hidden md:block  md:w-[614px] h-screen  relative">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div> */}
    </main>
  );
}

export default ResetPassword;
