import { useState } from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";
import Select from "react-select";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import useWordCount from "../../../hooks/useWordCount";

const API_URL = process.env.REACT_APP_CLIENT_URL;

const options = [
  { value: "user", label: "User" },
  { value: "admin", label: "Administrator" },
  { value: "moderator", label: "Moderator" },
];

interface ValueProps {
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  Dob: string;
  phone: string;
  location: string;
  address: string;
  aboutuser: string;
  social: string;
  interest: string[];
  role: string;
}

function CreateNewMember() {
  const { wordCount, handleWordCount } = useWordCount();

  const addAdminUserSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last is required."),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).max(12).required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    Dob: Yup.date(),
    phone: Yup.string(),
    location: Yup.string().required("Location is required"),
    address: Yup.string().required("address is required"),
    aboutuser: Yup.string()
      .required("About member is required")
      .test("max-words", "About member cannot exceed 400 words", (value) => {
        if (value) {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= 400;
        }
        return true;
      }),
    social: Yup.string(),
    interest: Yup.array().of(Yup.string()),
    role: Yup.string().oneOf(["user", "moderator", "admin"]),
  });

  const createAdmininitialValues: ValueProps = {
    image: "",
    firstname: "",
    lastname: "",
    email: "",
    Dob: "",
    phone: "",
    location: "",
    address: "",
    aboutuser: "",
    social: "",
    interest: [],
    password: "",
    confirmPassword: "",
    role: "",
  };

  const handleCreateAdminFormSubmit = async (
    values: ValueProps,
    { setSubmitting, resetForm }: FormikHelpers<ValueProps>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch(`${API_URL}/api/v1/secure/auth/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        resetForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // const [wordCount, setWordCount] = useState(0);
  // const handleWordCount = (text: string) => {
  //   const words = text.trim().split(/\s+/);
  //   setWordCount(words.length);
  // };

  const [imageName, setImageName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  return (
    <main>
      <div className=" max-w-[600px] w-full ">
        <h1 className="text-2xl text-[#212529] font-bold mb-[24px]">
          Add New User
        </h1>
        <Formik
          initialValues={createAdmininitialValues}
          validationSchema={addAdminUserSchema}
          onSubmit={handleCreateAdminFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className=" flex gap-2 items-center ">
                <label>
                  <img
                    src={
                      !imageName
                        ? "https://hbeachgarage.com/wp-content/uploads/2017/12/Hollywood-Beach-Garage-testimonial-3-150x150.png"
                        : imageName
                    }
                    alt="user profile image"
                    className=" w-16 h-16 rounded-lg"
                  />
                  {imageName}
                  <input
                    className=" invisible"
                    name="image"
                    value={values.image}
                    onChange={(event) => {
                      handleChange(event);
                      handleFileChange(event);
                    }}
                    type="file"
                  />
                </label>

                <span className=" text-xs text-[#3E454C]">
                  Upload profile picture
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Lable label="First name" />
                  <TextInput
                    type="text"
                    placeholderText="Enter firstname"
                    name="firstname"
                    value={values.firstname}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.firstname && errors.firstname}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Last name" />
                  <TextInput
                    type="text"
                    placeholderText="Enter lastname"
                    name="lastname"
                    value={values.lastname}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.lastname && errors.lastname}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Email address" />
                  <TextInput
                    type="text"
                    placeholderText="Enter Email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.email && errors.email}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Date of Birth" />
                  <TextInput
                    type="date"
                    placeholderText="Enter Date of Birth"
                    name="Dob"
                    value={values.Dob}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.Dob && errors.Dob}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Phone Number" />
                  <TextInput
                    type="text"
                    placeholderText="Enter Phone Number"
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.phone && errors.phone}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Location" />
                  <TextInput
                    type="text"
                    placeholderText="Example Ikeja"
                    name="location"
                    value={values.location}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.location && errors.location}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Lable label="Address" />
                  <TextInput
                    type="text"
                    placeholderText="Enter Address"
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.address && errors.address}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-[#212529] font-bold mt-6">
                  About User
                </h3>
                <div className="flex  flex-col gap-2 mt-8">
                  <Lable
                    label="Tell us about yourself, not more than 400 words"
                    className=" text-xs"
                  />
                  <textarea
                    placeholder="Write text"
                    className="bg-[#F4F6F7] border border-[#A6B4BA] rounded-lg p-4 h-[102px]"
                    name="aboutuser"
                    value={values.aboutuser}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      handleWordCount(e.target.value);
                    }}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.aboutuser && errors.aboutuser}
                  </span>
                  <span className=" flex justify-end text-sm text-[#212529]">
                    {wordCount}/400
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Lable label="Add your social link" />
                  <TextInput
                    type="text"
                    name="social"
                    value={values.social}
                    placeholderText="EG. https://www.google.com/me, https://www.twitter.com/ojo"
                    onBlur={handleBlur}
                    handleInputChange={handleChange}
                  />
                  <span className="text-[10px] text-red-400">
                    {errors.social && errors.social}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl text-[#212529] font-bold mb-8 ">
                  Set user interest
                </h3>
                <FieldArray name="interest">
                  {({ remove, push }) => (
                    <div>
                      <p className="mb-6">Select user photography interests</p>
                      <div className=" grid grid-cols-2 gap-4">
                        <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                          <TextInput
                            id="People_Photography"
                            type="checkbox"
                            name="interest"
                            value="People Photography"
                            // handleInputChange={handleChange}
                            checked={values.interest.includes(
                              "People Photography"
                            )}
                            handleInputChange={(e) => {
                              if (e.target.checked) push("People Photography");
                              else
                                remove(
                                  values.interest.indexOf("People Photography")
                                );
                            }}
                            className="w-6 h-14"
                          />
                          <Lable
                            label="People Photography"
                            htmlFor="People_Photography"
                          />
                        </div>
                        <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                          <TextInput
                            type="checkbox"
                            name="interest"
                            value="Manmade Objects"
                            // handleInputChange={handleChange}
                            checked={values.interest.includes(
                              "Manmade Objects"
                            )}
                            handleInputChange={(e) => {
                              if (e.target.checked) push("Manmade Objects");
                              else
                                remove(
                                  values.interest.indexOf("Manmade Objects")
                                );
                            }}
                            className="w-6 h-14"
                          />
                          <Lable label="Manmade Objects" />
                        </div>
                        <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                          <TextInput
                            type="checkbox"
                            name="interest"
                            value="Nature Photography"
                            // handleInputChange={handleChange}
                            checked={values.interest.includes(
                              "Nature Photography"
                            )}
                            handleInputChange={(e) => {
                              if (e.target.checked) push("Nature Photography");
                              else
                                remove(
                                  values.interest.indexOf("Nature Photography")
                                );
                            }}
                            className="w-6 h-14"
                          />
                          <Lable label="Nature Photography" />
                        </div>
                      </div>
                    </div>
                  )}
                </FieldArray>
                {/* <div>
                  <p className="mb-6">Select user photography interests</p>
                  <div className=" grid grid-cols-2 gap-4">
                    <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                      <TextInput
                        id="People_Photography"
                        type="checkbox"
                        name=""
                        value=""
                        handleInputChange={handleChange}
                        className="w-6 h-14"
                      />
                      <Lable
                        label="People Photography"
                        htmlFor="People_Photography"
                      />
                    </div>
                    <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                      <TextInput
                        type="checkbox"
                        name=""
                        value=""
                        handleInputChange={handleChange}
                        className="w-6 h-14"
                      />
                      <Lable label="Manmade Objects" />
                    </div>
                    <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                      <TextInput
                        type="checkbox"
                        name="interest"
                        value="Manmade Objects"
                        handleInputChange={handleChange}
                        className="w-6 h-14"
                      />
                      <Lable label="Nature Photography" />
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Lable label="Password" />
                <TextInput
                  type="text"
                  name="password"
                  value={values.password}
                  placeholderText="Enter password"
                  onBlur={handleBlur}
                  handleInputChange={handleChange}
                />
                <span className="text-[10px] text-red-400">
                  {errors.password && errors.password}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Lable label="Confirm Password" />
                <TextInput
                  type="text"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  placeholderText="Confirm password"
                  onBlur={handleBlur}
                  handleInputChange={handleChange}
                />
                <span className="text-[10px] text-red-400">
                  {errors.confirmPassword && errors.confirmPassword}
                </span>
              </div>
              <div className=" space-y-2 mt-6 mb-12">
                <Lable label="User Role" className=" text-xs" />

                <Select
                  options={options}
                  name="role"
                  value={options.find((option) => option.value === values.role)}
                  onChange={(option) =>
                    setFieldValue("role", option ? option.value : "")
                  }
                  className="bg-[#F4F6F7]"
                />

                <span className="text-[10px] text-red-400"></span>
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  text="Create User"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
                  className="w-full"
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
              </div>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default CreateNewMember;
