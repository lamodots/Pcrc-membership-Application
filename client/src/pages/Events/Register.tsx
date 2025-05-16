import { useState, ChangeEvent, FormEvent } from "react";
import TextInput from "../../components/Input/TextInput";
import Lable from "../../components/Lable/Lable";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import { dateFormater } from "../../util/DateFormater";
import { Calendar, Locate } from "lucide-react";
import Advertisment from "../../components/Advertisment/Advertisment";

const API_URL = process.env.REACT_APP_CLIENT_URL;

// Define types for form values and attendees
interface FormValues {
  fullname: string;
  email: string;
  phone: string;
  whatsappphone: string;
  number: string;
}

interface Attendee {
  id: number;
  name: string;
}

function RegisterEvent() {
  const [attendees, setAttendees] = useState<Attendee[]>([]); // Start with no attendees
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    phone: "",
    whatsappphone: "",
    number: "0", // Default to 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSucessful, setIsSucessful] = useState(false);
  const [isDublicateReg, setIsDublicateReg] = useState(false);

  const { id: eventId } = useParams();
  const location = useLocation();
  const { annoucementData: eventData } = location.state;

  // Validate that the input contains only letters and spaces (or is empty)
  const validateName = (name: string): boolean => {
    if (name === "") return true; // Allow empty strings
    const regex = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
    return regex.test(name);
  };

  // Handle changes in form inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle changes in attendee names
  const handleAttendeeChange = (id: number, value: string): void => {
    if (value !== "" && !validateName(value)) {
      toast.error(
        "Family member names cannot contain numbers or special characters."
      );
      return;
    }
    setAttendees((prevAttendees) =>
      prevAttendees.map((attendee) =>
        attendee.id === id ? { ...attendee, name: value } : attendee
      )
    );
  };

  // Add a new attendee
  const addAttendee = (): void => {
    if (attendees.length >= 5) {
      toast.error("You can only add up to 5 family members.");
      return;
    }
    const newAttendee = { id: Date.now(), name: "" };
    setAttendees([...attendees, newAttendee]);
    setFormValues({ ...formValues, number: (attendees.length + 1).toString() }); // Increment count
    toast.success("Family member added!"); // Feedback for user
  };

  // Remove an attendee
  const removeAttendee = (id: number): void => {
    const updatedAttendees = attendees.filter((attendee) => attendee.id !== id);
    setAttendees(updatedAttendees);
    setFormValues({
      ...formValues,
      number: updatedAttendees.length.toString(),
    }); // Decrement count
    toast.success("Family member removed!"); // Feedback for user
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate personal information fields
    if (!formValues.fullname.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!formValues.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!formValues.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    // Validate attendee names
    for (const attendee of attendees) {
      if (!attendee.name.trim()) {
        toast.error("Please fill in all family member names.");
        return;
      }
      if (!validateName(attendee.name)) {
        toast.error(
          "Family member names cannot contain numbers or special characters."
        );
        return;
      }
    }

    try {
      const attendeeCount = parseInt(formValues.number || "0", 10);

      if (attendees.length !== attendeeCount) {
        toast.error(
          "Number of attendees does not match the number of attendee names provided."
        );
        return;
      }

      const formData = {
        full_name: formValues.fullname,
        email: formValues.email,
        phone_number: formValues.phone,
        whatsapp_number: formValues.whatsappphone,
        number_of_family_members: formValues.number,
        attendees: attendees.map((attendee) => ({
          attendee_full_name: attendee.name,
        })),
        event: eventId,
      };

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await fetch(`${API_URL}/api/v1/secure/events/applicants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful! Check your email.");
        setIsSucessful(true);
        setIsDublicateReg(false);
        // Reset the form after successful submission
        setFormValues({
          fullname: "",
          email: "",
          phone: "",
          whatsappphone: "",
          number: "0", // Reset to 0
        });
        setAttendees([]); // Clear all attendees
      } else {
        toast.error(
          result.message || result.error || "Applicant already registered!"
        );
        setIsDublicateReg(true);
        setIsSucessful(false);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-zinc-50 rounded-lg shadow-sm font-sans">
      <header className="mb-8">
        <div className=" h-1/4 md:h-[360px] flex items-center justify-center  rounded-lg bg-white mb-6">
          <img
            className=" rounded-lg  w-full max-w-[940px] h-full"
            src={`${eventData?.photoImage}`}
            alt={eventData.title}
          />
        </div>
        <small className="font-semibold">
          {dateFormater(eventData.startDate)}
        </small>
        <h1 className=" text-2xl md:text-4xl font-bold mb-4 text-shark-950 capitalize">
          {eventData.title}
        </h1>
        <div className="mb-2">
          <h3 className="text-xl font-bold text-shark-950">Date and Time</h3>
          <div className="flex items-center gap-4 mt-2">
            <Calendar />
            <div>
              <strong className="font-medium text-shark-600">
                {dateFormater(eventData.startDate)}
              </strong>
              -
              <span className="font-medium text-shark-600">
                {eventData.time}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-2 mt-6">
          <h3 className="text-xl font-bold text-shark-950">Location</h3>
          <div className="flex items-center gap-4 mt-2">
            <Locate />
            <div>
              <span className="font-medium text-shark-600">
                {eventData.venue}
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-shark-950">About this event</h3>
        <p className="text-shark-600">{eventData.description}</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <section className="py-8 space-y-6">
            <h3 className="text-xl font-bold text-shark-950">
              Personal Information
            </h3>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Full name" />
              <TextInput
                type="text"
                name="fullname"
                placeholderText="Enter your full name"
                value={formValues.fullname}
                handleInputChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Email Address" />
              <TextInput
                type="email"
                name="email"
                placeholderText="Enter your email"
                value={formValues.email}
                handleInputChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Phone Number" />
              <TextInput
                type="text"
                name="phone"
                placeholderText="Enter your phone number"
                value={formValues.phone}
                handleInputChange={handleInputChange}
                required
              />
            </div>
          </section>

          {/* Attendee Information */}
          <section className="space-y-6 mb-8">
            <h3 className="text-xl font-bold text-shark-800">
              Family Members Attending
            </h3>
            <div className="mb-4 flex flex-col gap-2">
              <Lable label="Number of family members attending (0 if none)" />
              <TextInput
                type="number"
                name="number"
                value={formValues.number}
                handleInputChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value, 10)); // Prevent negative values
                  setFormValues({ ...formValues, number: value.toString() });
                }}
                min="0"
                max="5"
                readOnly // Make the input read-only
              />
              <p className="text-sm text-shark-500">
                You can add up to 5 family members.
              </p>
            </div>
            {/* Show "Add Family Member" button by default */}
            <Button
              text="Add Family Member"
              type="button"
              handleClick={addAttendee}
              className="px-8 py-2 text-white bg-blue-500 hover:bg-blue-600"
              disableBtn={attendees.length >= 5} // Disable button if max attendees reached
            />
            {/* Show attendee input fields and remove buttons only after "Add" is clicked */}
            {attendees.length > 0 && (
              <div className="space-y-6">
                {attendees.map((attendee) => (
                  <div key={attendee.id} className="flex items-end gap-4">
                    <div className="w-1/2">
                      <Lable label="Enter family member's name" />
                      <TextInput
                        type="text"
                        name={`attendee-${attendee.id}`}
                        placeholderText="Enter family member's name"
                        value={attendee.name}
                        handleInputChange={(e) =>
                          handleAttendeeChange(attendee.id, e.target.value)
                        }
                        className="w-full"
                        required
                      />
                    </div>
                    <Button
                      text="Remove"
                      type="button"
                      handleClick={() => removeAttendee(attendee.id)}
                      className="px-8 text-white bg-red-500 hover:bg-red-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <Button
            text="Complete Registration"
            isSubmitting={isSubmitting}
            disableBtn={isSubmitting}
            className="px-8 text-white w-full md:w-1/2 bg-green-500 hover:bg-green-600"
          >
            {isSubmitting && (
              <Oval
                visible={true}
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </Button>
        </form>
        {isSucessful && (
          <div className="my-8 bg-blue-300 rounded-lg p-6 shadow-lg transition-all  ">
            <h3 className="font-bold">Registration success!</h3>
            <p className=" leading-6">
              Please await confirmation via email, which will include a QR code
              upon approval from the KSN Treasurer
            </p>
          </div>
        )}

        {isDublicateReg && (
          <div className="my-8 bg-red-600 rounded-lg p-6 shadow-lg transition-all">
            <h3 className="font-bold text-white">Error: Duplicate Entry!</h3>
            <p className=" leading-6 text-white">
              You have already registered. Please await the confirmation email.
            </p>
          </div>
        )}
        <Advertisment />
      </main>
    </div>
  );
}

export default RegisterEvent;
