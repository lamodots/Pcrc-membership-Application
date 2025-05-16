import { useState } from "react";

import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";

import Button from "../../components/Button/Button";

import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
// import ksnImage from "../../assets/ksn.jpg";
interface ValuesProps {
  email: string;
}

const API_URL = process.env.REACT_APP_CLIENT_URL;
function ForgotPassword() {
  const [showForgotPasswordMessage, setShowForgotPasswordMessage] =
    useState(false);

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
  });

  const initialValues = {
    email: "",
  };

  const handleSubmitForgotPassword = async (
    values: ValuesProps,
    { setSubmitting, resetForm }: FormikHelpers<ValuesProps>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const res = await fetch(`${API_URL}/api/v1/users/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const { message, msg } = await res.json();
      if (!res.ok) {
        return toast.error(msg);
      }

      toast.success(message);
      resetForm();
      setShowForgotPasswordMessage(true);
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occured");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    // bg-[#F4F6F7]
    <main className="w-screen flex flex-col justify-center items-center  h-screen overflow-hidden">
      <div className=" flex justify-center mb-4">
        <BrandLogo color="#F5F7FA" />
      </div>
      <div className="userform max-w-[512px] w-full bg-white px-6 py-8 rounded-lg shadow-lg md:bg-inherit md:rounded-none md:shadow-none">
        {showForgotPasswordMessage ? (
          <div
            role="alert"
            className=" bg-[#0dcaf0] px-6 py-8 border-l-4 border-l-cyan-800 w-full leading-6"
          >
            <p>
              An email with instructions to reset your password has been sent to
              your registered email address. Please check your inbox (and spam
              folder) and follow the link to proceed.
            </p>
          </div>
        ) : (
          <>
            <h1 className=" text-2xl text-[#212529] text-center font-bold">
              Forgot Password
            </h1>
            <p className="text-center">Enter your registered email address</p>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmitForgotPassword}
              validationSchema={forgetPasswordSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="  flex flex-col gap-2  w-full">
                    <Lable label="Email" />
                    <TextInput
                      type="email"
                      placeholderText="Enter your email"
                      name="email"
                      value={values.email}
                      handleInputChange={handleChange}
                    />
                    <span className="text-sm text-red-400">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    text="Reset link"
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

        {/* I will remove the para later */}
      </div>

      {/* <div className=" hidden md:block  md:w-[614px] h-screen  relative">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div> */}
    </main>
  );
}

export default ForgotPassword;
