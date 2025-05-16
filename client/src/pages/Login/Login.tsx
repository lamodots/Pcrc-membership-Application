import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useCurrentUser } from "../../context/AdminContext";
import Advertisment from "../../components/Advertisment/Advertisment";

import BrandLogo from "../../components/BrandLogo/BrandLogo";

interface ValuesProps {
  email: string;
  password: string;
}

const API_URL = process.env.REACT_APP_CLIENT_URL;

function Login() {
  const { currentUser, setCurrentUser, fetchCurrentUser } = useCurrentUser();
  const [setAlert, isSetAlert] = useState(false);
  const [useremail, setuserEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) navigate("/");
  // }, [currentUser, navigate]);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(16, "Password cannot be longer than 16 characters.")
      .required("Password is required."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/users/auth/login`, {
        method: "POST",

        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { msg, message, user } = await res.json();
      if (!res.ok) {
        if (msg === "Please verify your email !") {
          isSetAlert(true);
        }
        return toast.error(msg || "Invalid email or password");
      }

      toast.success(message || "Login sucessfull");
      // setCurrentUser(user);
      await fetchCurrentUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

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
    <main className=" h-full overflow-y-auto w-full">
      <div className="max-w-[512px] w-full bg-[#F4F6F7] pb-8 rounded-lg shadow-lg mt-10 mx-auto">
        <div className="userform bg-[#F4F6F7] px-6 py-8 rounded-lg  md:bg-inherit md:rounded-none ">
          {setAlert && (
            <div className="flex justify-center">
              <div className=" border-l-4 border-l-yellow-600 border rounded  p-4 w-full  md:max-w-[512px] mt-6">
                <p className="text-xs">
                  Your email need to be verified before you can login. <br />{" "}
                  Check your email{" "}
                  <span className=" text-yellow-600">{useremail}</span> for a
                  confirmation email link. Please click on the link in the email
                  to verify your email address.
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
          <div>
            <div className=" flex justify-center mb-4">
              <BrandLogo color="#F5F7FA" />
            </div>
            <h1 className=" text-2xl text-[#212529] text-center font-bold mb-8 md:mb-0">
              Welcome Back !
            </h1>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-2  w-full">
                  <Lable label="Email" />
                  <TextInput
                    type="email"
                    placeholderText="Enter your email"
                    name="email"
                    value={values.email}
                    handleInputChange={(e) => {
                      handleChange(e);
                      setuserEmail(e.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <span className="text-sm text-red-400">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="password flex flex-col gap-2  w-full">
                  <Lable label="Password" />
                  <TextInput
                    type="password"
                    placeholderText="Enter your password"
                    name="password"
                    value={values.password}
                    handleInputChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="text-sm text-red-400">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <Button
                  type="submit"
                  text="Login"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
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
        <p className=" text-center text-base mt-8">
          <Link to="/forgot-password" className="text-base text-[#3f150b]">
            Forgot your password? we will help you reset it
          </Link>
        </p>
        <p className="text-center text-sm mt-6">
          Dont have an account ?{" "}
          <Link to="/register" className=" font-bold text-[#3f150b]">
            Register
          </Link>
        </p>
      </div>
      <Advertisment />
    </main>
  );
}

export default Login;
