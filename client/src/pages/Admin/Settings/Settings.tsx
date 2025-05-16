import { useEffect, useState } from "react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import { Formik, FormikHelpers, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button/Button";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_CLIENT_URL;

// const options = [
//   { value: "content", label: "Content" },
//   { value: "certificate", label: "Certificate" },
//   { value: "id-card", label: "Id-Card" },
// ];

interface SecretaryData {
  name: string;
  phone: string;
  area: string;
}

interface ValuesProps {
  appname: string;
  appname_acronym: string;
  paymentapi: string;
  whatsappapi: string;
  pagelink: string[];
  applogo: File | null;
  sendgridapi: string;
  welfare_fee: string;
  lifetime_fee: string;
  annual_fee: string;
  secretaries: SecretaryData[];
}

function Settings() {
  const [appData, setAppData] = useState<ValuesProps | null>(null);
  const [showSettingsData, setShowSettingsData] = useState({
    paymentapi: false,
    whatsappapi: false,
    sendgridapi: false,
  });

  const settingsSchema = Yup.object().shape({
    appname: Yup.string()
      .trim()
      .max(
        150,
        "Application name must be a string with a maximum of 150 characters"
      )
      .required("Application name is required"),
    appname_acronym: Yup.string()
      .trim()
      .max(
        12,
        "Application name acronym must be a string with a maximum of 4 characters"
      )
      .required("Application name is required"),
    paymentapi: Yup.string().required("API key is required.").trim(),
    whatsappapi: Yup.string().required("WhatsApp API key is required.").trim(),
    sendgridapi: Yup.string().required("Sendgrid API key is required.").trim(),
    pagelink: Yup.array().of(Yup.string()),
    applogo: Yup.mixed().required("Event image is required"),
    welfare_fee: Yup.string(),
    lifetime_fee: Yup.string(),
    annual_fee: Yup.string(),
    secretaries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Secretary name is required"),
        phone: Yup.string().required("Phone number is required"),
        area: Yup.string().required("Area is required"),
      })
    ),
  });

  const initialValues: ValuesProps = {
    appname: appData?.appname || "",
    appname_acronym: appData?.appname_acronym || "",
    paymentapi: appData?.paymentapi || "",
    whatsappapi: appData?.whatsappapi || "",
    pagelink: [],
    applogo: null,
    sendgridapi: appData?.sendgridapi || "",
    welfare_fee: appData?.welfare_fee || "",
    lifetime_fee: appData?.lifetime_fee || "",
    annual_fee: appData?.annual_fee || "",
    secretaries: appData?.secretaries || [],
  };

  async function getAppSettings() {
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error fetching App settings`);
      }
      const { appDetails } = await res.json();
      setAppData(appDetails[0]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAppSettings();
  }, []);

  async function handleSubmitSettings(
    values: ValuesProps,
    { setSubmitting }: FormikHelpers<ValuesProps>
  ) {
    try {
      const formData = new FormData();

      formData.append("appname", values.appname);
      formData.append("appname_acronym", values.appname_acronym);
      formData.append("paymentapi", values.paymentapi);
      formData.append("whatsappapi", values.whatsappapi);
      formData.append("applogo", values.applogo as File);
      formData.append("sendgridapi", values.sendgridapi);
      formData.append("welfare_fee", values.welfare_fee);
      formData.append("lifetime_fee", values.lifetime_fee);
      formData.append("annual_fee", values.annual_fee);

      // Add secretaries data to form data as JSON string
      formData.append("secretaries", JSON.stringify(values.secretaries));

      console.log(formData);

      const res = await fetch(`${API_URL}/api/v1/secure/settings`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        const { message } = await res.json();
        toast.success(message);
        // navigate("/secure/settings");
      } else {
        const errorData = await res.json();
        toast.error(errorData.msg || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // handleshow Config data
  const handleShowSettingsData = (field: keyof typeof showSettingsData) => {
    setShowSettingsData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">General settings</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={settingsSchema}
            onSubmit={handleSubmitSettings}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-6">
                  <div className=" space-x-2 grid grid-cols-[8fr_4fr] items-center">
                    <div>
                      <Lable
                        label="Customize Application full name *"
                        className=" text-xs"
                      />
                      <TextInput
                        type="text"
                        placeholderText="Enter application name"
                        name="appname"
                        value={values.appname}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.appname && errors.appname}
                      </span>
                    </div>
                    <div>
                      <Lable
                        label="Customize Application acronym  *"
                        className=" text-xs"
                      />
                      <TextInput
                        type="text"
                        placeholderText="Enter application acronym "
                        name="appname_acronym"
                        value={values.appname_acronym}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.appname_acronym && errors.appname_acronym}
                      </span>
                    </div>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup payment API (For Handing payments) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={showSettingsData.paymentapi ? "text" : "password"}
                        placeholderText="Enter payment API Key"
                        name="paymentapi"
                        value={values.paymentapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("paymentapi")}
                      >
                        {showSettingsData.paymentapi ? "hide" : "show"}
                      </button>
                    </div>
                    <span className="text-[10px] text-red-400">
                      {errors.paymentapi && errors.paymentapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup WhatsApp API Key (For sending Birthday WhatsApp Text Message) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={
                          showSettingsData.whatsappapi ? "text" : "password"
                        }
                        placeholderText="Enter WhatsApp API"
                        name="whatsappapi"
                        value={values.whatsappapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("whatsappapi")}
                      >
                        {showSettingsData.whatsappapi ? "hide" : "show"}
                      </button>
                    </div>

                    <span className="text-[10px] text-red-400">
                      {errors.whatsappapi && errors.whatsappapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Setup SendGrid API (For sending Transactional emails) *"
                      className=" text-xs"
                    />
                    <div className="flex space-x-2 border border-[#515F69] bg-[#F4F6F7] rounded-lg pr-2 ">
                      <TextInput
                        type={
                          showSettingsData.sendgridapi ? "text" : "password"
                        }
                        placeholderText="Enter sendgrid API Key"
                        name="sendgridapi"
                        value={values.sendgridapi}
                        handleInputChange={handleChange}
                        className="w-full rounded-tr-none rounded-br-none border-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleShowSettingsData("sendgridapi")}
                      >
                        {showSettingsData.sendgridapi ? "hide" : "show"}
                      </button>
                    </div>

                    <span className="text-[10px] text-red-400">
                      {errors.sendgridapi && errors.sendgridapi}
                    </span>
                  </div>
                  <div className=" space-y-2">
                    <Lable
                      label="Upload app logo 32 x 32 size with transparent background *"
                      className=" text-xs"
                    />
                    <TextInput
                      type="file"
                      name="applogo"
                      accept="image/*"
                      handleInputChange={(event) => {
                        const file =
                          event.currentTarget.files &&
                          event.currentTarget.files[0];
                        if (file) {
                          setFieldValue("applogo", file);
                        }
                      }}
                      className="w-full border-none"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.applogo && errors.applogo}
                    </span>
                  </div>
                </div>

                <hr className="my-6"></hr>

                <div>
                  <h2 className="text-lg text-zinc-800 font-semibold my-4">
                    Fee Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <Lable label="ID fee Amount *" className=" text-xs" />
                      <input
                        type="text"
                        placeholder="Enter amount members pay for ID "
                        name="welfare_fee"
                        value={values.welfare_fee}
                        onChange={handleChange}
                        className="w-full px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.welfare_fee && errors.welfare_fee}
                      </span>
                    </div>
                    <div>
                      <Lable
                        label="Coporate Membership Amount *"
                        className=" text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Enter Cooporate Membership Amount "
                        name="lifetime_fee"
                        value={values.lifetime_fee}
                        onChange={handleChange}
                        className="w-full px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.lifetime_fee && errors.lifetime_fee}
                      </span>
                    </div>
                    <div>
                      <Lable
                        label="Annual Membership Amount *"
                        className=" text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Enter Annual Membership Amount "
                        name="annual_fee"
                        value={values.annual_fee}
                        onChange={handleChange}
                        className="w-full px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.annual_fee && errors.annual_fee}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="my-6"></hr>

                {/* Secretaries Section */}
                <div>
                  <h2 className="text-lg text-zinc-800 font-semibold my-4">
                    Secretaries Management
                  </h2>

                  <FieldArray name="secretaries">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.secretaries && values.secretaries.length > 0 ? (
                          values.secretaries.map((secretary, index) => (
                            <div
                              key={index}
                              className="p-4 border border-[#515F69] rounded-lg bg-[#F4F6F7] relative"
                            >
                              <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 font-bold"
                                onClick={() => remove(index)}
                              >
                                ×
                              </button>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Lable
                                    label="Secretary Name *"
                                    className="text-xs"
                                  />
                                  <TextInput
                                    type="text"
                                    placeholderText="Enter secretary name"
                                    name={`secretaries.${index}.name`}
                                    value={secretary.name}
                                    handleInputChange={handleChange}
                                    className="w-full"
                                  />
                                  <span className="text-[10px] text-red-400">
                                    {errors.secretaries &&
                                      touched.secretaries &&
                                      errors.secretaries[index] &&
                                      (errors.secretaries[index] as any).name}
                                  </span>
                                </div>

                                <div>
                                  <Lable
                                    label="Phone Number *"
                                    className="text-xs"
                                  />
                                  <TextInput
                                    type="text"
                                    placeholderText="Enter phone number"
                                    name={`secretaries.${index}.phone`}
                                    value={secretary.phone}
                                    handleInputChange={handleChange}
                                    className="w-full"
                                  />
                                  <span className="text-[10px] text-red-400">
                                    {errors.secretaries &&
                                      touched.secretaries &&
                                      errors.secretaries[index] &&
                                      (errors.secretaries[index] as any).phone}
                                  </span>
                                </div>

                                <div>
                                  <Lable label="Area *" className="text-xs" />
                                  <TextInput
                                    type="text"
                                    placeholderText="E.g. Ikorodu, Ikeja"
                                    name={`secretaries.${index}.area`}
                                    value={secretary.area}
                                    handleInputChange={handleChange}
                                    className="w-full"
                                  />
                                  <span className="text-[10px] text-red-400">
                                    {errors.secretaries &&
                                      touched.secretaries &&
                                      errors.secretaries[index] &&
                                      (errors.secretaries[index] as any).area}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">
                            No secretaries added yet.
                          </p>
                        )}

                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          onClick={() =>
                            push({ name: "", phone: "", area: "" })
                          }
                        >
                          + Add Secretary
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <Button
                  type="submit"
                  text="Update settings "
                  className="w-full mt-8"
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
        </div>
      </section>
    </main>
  );
}

export default Settings;
