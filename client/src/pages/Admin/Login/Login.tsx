import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import Button from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../context/AdminContext";

import BrandLogo from "../../../components/BrandLogo/BrandLogo";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface ValuesProps {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

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
    // same shape as initial values
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await fetch(`${API_URL}/api/v1/secure/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
      });

      // console.log(await res.json());
      if (res.ok) {
        const { message, tokenUser } = await res.json();
        setCurrentUser(tokenUser);
        toast.success(message);

        navigate("/secure");
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error("Something went wrong! Check your connection");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-1 items-center mx-auto md:px-[1.5rem]  max-w-lg h-screen overflow-hidden">
      <div className="userform ">
        <div className="userform bg-white shadow-sm rounded-lg p-8">
          <div className="mb-8">
            <div className=" flex justify-center mb-4">
              <BrandLogo color="#F5F7FA" />
            </div>
            <h1 className=" text-2xl text-[#212529] text-center font-bold">
              Admin Portal Login
            </h1>
            <small className="text-center flex justify-center">
              Security is a process, not a product.
            </small>
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
              <form className="flex flex-col " onSubmit={handleSubmit}>
                <div className=" flex flex-col gap-2">
                  <Lable label="Email" />
                  <TextInput
                    type="email"
                    placeholderText="Enter your email"
                    name="email"
                    value={values.email}
                    handleInputChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="text-sm text-red-400">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
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
                  className="mt-4"
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

        {/* <p className=" text-center text-base mt-8">
          <Link to="forgot-password" className="text-base text-[#1A4F83]">
            Forgot your password? we will help you reset it
          </Link>
        </p> */}
      </div>
    </main>
  );
}

export default Login;
