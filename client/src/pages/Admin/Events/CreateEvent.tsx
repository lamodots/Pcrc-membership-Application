import toast from "react-hot-toast";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";
import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import Button from "../../../components/Button/Button";
import useWordCount from "../../../hooks/useWordCount";
import { formatTimeWithAmPm } from "../../../util/formatTimeWithAMPM";
import { useCurrentUser } from "../../../context/AdminContext";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface EventProps {
  title: string;
  startDate: string;
  endDate: string;
  photoImage: File | null;
  time: string;
  venue: string;
  description: string;
}

function CreateEvent() {
  const { currentUser } = useCurrentUser();
  console.log(currentUser);
  const { wordCount, handleWordCount } = useWordCount();

  const eventSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .max(120, "Event name must be a string with a maximum of 120 characters")
      .required("Event title is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    photoImage: Yup.mixed().required("Event image is required"),
    time: Yup.string().required("Event time required"),
    venue: Yup.string().required("Where is the Event happening ? Add venue"),
    description: Yup.string()
      .trim()
      .max(400)
      .required("Event description is required"),
  });

  const initialValues: EventProps = {
    title: "",
    startDate: "",
    endDate: "",
    photoImage: null,
    time: "",
    venue: "",
    description: "",
  };

  async function handleEventSubmit(
    values: EventProps,
    { setSubmitting, resetForm }: FormikHelpers<EventProps>
  ) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("photoImage", values.photoImage as File);
      formData.append("time", formatTimeWithAmPm(values.time));
      formData.append("venue", values.venue);
      formData.append("description", values.description);

      const res = await fetch(`${API_URL}/api/v1/secure/events`, {
        method: "POST",
        body: formData,
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
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section>
        <h1 className="text-2xl text-[#212529] font-bold">Create Event</h1>
        <div className="form mt-8 w-full max-w-[600px]">
          <Formik
            initialValues={initialValues}
            validationSchema={eventSchema}
            onSubmit={handleEventSubmit}
          >
            {({
              values,
              errors,
              setFieldValue,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <Lable label="Event title *" className="text-xs" />
                    <TextInput
                      type="text"
                      placeholderText="Enter Event title"
                      name="title"
                      value={values.title}
                      handleInputChange={handleChange}
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.title && errors.title}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Lable label="Event start date *" className="text-xs" />
                      <TextInput
                        type="date"
                        name="startDate"
                        value={values.startDate}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.startDate && errors.startDate}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Lable label="Event end date *" className="text-xs" />
                      <TextInput
                        type="date"
                        name="endDate"
                        value={values.endDate}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.endDate && errors.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 ">
                      <Lable
                        label="Upload app logo 600 x 600 size *"
                        className="text-xs"
                      />
                      <TextInput
                        type="file"
                        accept="image/*"
                        name="photoImage"
                        handleInputChange={(event) => {
                          const file =
                            event.currentTarget.files &&
                            event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("photoImage", file);
                          }
                        }}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.photoImage && errors.photoImage}
                      </span>
                    </div>
                    <div className="space-y-2  ">
                      <Lable label="Set Event time *" className="text-xs" />
                      <TextInput
                        type="time"
                        name="time"
                        value={values.time}
                        handleInputChange={handleChange}
                        className="w-full"
                      />
                      <span className="text-[10px] text-red-400">
                        {errors.time && errors.time}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <Lable label="Event Venue *" className="text-xs" />
                    <TextInput
                      type="text"
                      name="venue"
                      value={values.venue}
                      handleInputChange={handleChange}
                      placeholderText="Enter event Venue"
                      className="w-full"
                    />
                    <span className="text-[10px] text-red-400">
                      {errors.venue && errors.venue}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Lable label="Event Description *" className="text-xs" />
                    <div>
                      <div className="w-full px-3 py-2 rounded-lg border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA] border mb-2">
                        <textarea
                          rows={8}
                          placeholder="Event Description"
                          className="w-full border-0 outline-0 bg-[#F4F6F7]"
                          name="description"
                          value={values.description}
                          onChange={(e) => {
                            handleWordCount(e.target.value);
                            handleChange(e);
                          }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-red-400">
                          {errors.description && errors.description}
                        </span>
                        <small className="text-[#1A4F83]">
                          {wordCount}/400
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  text="Create Event"
                  isSubmitting={isSubmitting}
                  disableBtn={isSubmitting}
                  className="w-full mt-6"
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

export default CreateEvent;
