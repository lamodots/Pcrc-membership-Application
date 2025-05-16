import { useState } from "react";

import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";

import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import Advertisment from "../../components/Advertisment/Advertisment";
import BrandLogo from "../../components/BrandLogo/BrandLogo";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface RegisterValueProps {
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const [setAlert, isSetAlert] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(16, "Password cannot be longer than 16 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Your passwords do not match.")
      .required("Please retype your password."),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (
    values: RegisterValueProps,
    { setSubmitting, resetForm }: FormikHelpers<RegisterValueProps>
  ) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/users/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      const { msg, message } = await res.json();
      if (!res.ok) {
        toast.error(msg);
      }
      toast.success(message);
      setUseremail(values.email);
      isSetAlert(true);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  // const handleResendEmail = async () => {
  //   const res = await fetch(
  //     `${API_URL}/api/v1/users/auth/resent-verify-email`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: useremail,
  //       }),
  //     }
  //   );

  //   if (!res.ok) {
  //     toast.error("failed to resend email");
  //   }
  //   toast.success("Another email have been sent");
  // };
  const handleResendEmail = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/users/auth/resent-verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: useremail,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("failed to resend email");
      }
      toast.success("Another email have been sent");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className=" regpage bg-[#F6f6f6] w-full  h-full overflow-y-auto">
      {setAlert && (
        <div className="flex justify-center mt-10">
          <div className=" border-l-4 border-l-yellow-600 border rounded  p-4 w-full  md:max-w-[512px] mt-6">
            <p className="text-xs">
              A confirmation email has been sent to your email address <br />
              <span className=" text-yellow-600">{useremail}</span>. Please
              click on the link in the email to verify your email address.{" "}
              <span className=" font-bold"> Dont get email?</span>{" "}
              <button
                onClick={handleResendEmail}
                className="text-blue-700 font-bold"
              >
                {submitting ? "Resending email ..." : "Resend"}
              </button>
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center  md:h-screen">
        <div className="max-w-[512px] w-full">
          <div className="userform  bg-white px-6 py-8 rounded-lg shadow-lg md:bg-white md:shadow-none">
            <div className=" flex justify-center mb-4">
              <BrandLogo color="#F5F7FA" />
            </div>
            <h1 className=" text-2xl text-[#212529] text-center font-bold mb-8 md:mb-0">
              Membership Registration
            </h1>

            <Formik
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              validationSchema={registerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                resetForm,
              }) => (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className=" flex flex-col gap-2 w-full">
                    <Lable label="Email" />
                    <TextInput
                      type="text"
                      placeholderText="Enter your email"
                      name="email"
                      value={values.email}
                      handleInputChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-xs text-red-400">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div className="password flex flex-col gap-2  w-full">
                    <Lable label="Create your new password" />
                    <TextInput
                      type="password"
                      placeholderText="Type your new password"
                      name="password"
                      value={values.password}
                      handleInputChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-xs text-red-400">
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                  <div className="password flex flex-col gap-2  w-full">
                    <Lable label="Confirm your new password" />
                    <TextInput
                      type="password"
                      placeholderText="Retype your new password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      handleInputChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="text-xs text-red-400">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </span>
                  </div>
                  <Button
                    type="submit"
                    text="Get started"
                    disableBtn={isSubmitting}
                    isSubmitting={isSubmitting}
                    className="mt-8"
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
          </div>
          <Link
            to=""
            className=" text-[#3f150b] block text-center text-base mt-6 md:mt-0"
          >
            <p>Agree to terms and conditions</p>
          </Link>
          <p className="text-center text-sm mt-6">
            Already have an account ?{" "}
            <Link to="/login" className=" font-bold text-[#3f150b]">
              Login
            </Link>
          </p>
        </div>

        {/* <div className=" hidden md:block  md:w-[614px] h-screen  relative">
        <img src={LoginAsset} className="w-[614px] h-full relative -right-8" />
      </div> */}
      </div>
      <Advertisment />
    </main>
  );
}

export default Register;
