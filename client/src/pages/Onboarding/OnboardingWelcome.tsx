// import { useState } from "react";
// import Button from "../../components/Button/Button";
// import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
// import { useCurrentUser } from "../../context/AdminContext";
// import Lable from "../../components/Lable/Lable";
// import TextInput from "../../components/Input/TextInput";
// import InternationalTelephoneInput from "../../components/Input/InternatioanlTelephoneInput";
// import { NIGERIANSTATES } from "../../util/nigerianStates";
// import useFetchAppData from "../../hooks/useFetchAppData";

// const API_URL = process.env.REACT_APP_CLIENT_URL;

// export interface Values {
//   firstname: string;
//   lastname: string;
//   title: string;
//   studio: string;
//   Dob: string;
//   whatsappId: string;
//   gender: string;
//   bloodgroup: string;
// }

// const initialStepOne: Values = {
//   Dob: "",
//   whatsappId: "",
//   firstname: "",
//   lastname: "",
//   title: "",
//   studio: "",
//   gender: "",
//   bloodgroup: "",
// };

// const validateStepOne = (data: Values) => {
//   const errors: { [key: string]: string } = {};
//   if (!data.firstname.trim()) errors.firstName = "First name is required";
//   if (!data.Dob.trim()) errors.dob = "Date of birth is required";
//   if (!data.whatsappId.trim())
//     errors.whatsappId = "Whatsapp number is required";
//   if (!data.lastname.trim()) errors.lastName = "Last name is required";
//   if (!data.title) errors.title = "Title is required";
//   if (!data.studio) errors.studio = "Studio name is required";
//   if (!data.gender) errors.gender = "Gender required";
//   if (!data.bloodgroup) errors.bloodgroup = "Blood group is required";
//   return errors;
// };

// function OnboardingWelcome() {
//   const { currentUser, fetchCurrentUser } = useCurrentUser();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { appData } = useFetchAppData();
//   const [errors, setErrors] = useState<{ [key: string]: any }>({});
//   const navigate = useNavigate();

//   // State List
//   const states = NIGERIANSTATES.map((v, i) => <option key={i}>{v}</option>);
//   // Fetch Location from Database
//   const zone = appData?.secretaries.map((v, i) => (
//     <option key={i}>{v.area}</option>
//   ));

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     const errs = validateStepOne({
//       firstname: "First name is required",
//       Dob: "Date of birth is required",
//       whatsappId: "Whatsapp number is required",
//       lastname: "Last name is required",
//       title: "Title is required",
//       studio: "Studio name is required",
//       gender: "Gender required",
//       bloodgroup: "Blood group is required",
//     });
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }
//     try {
//       setIsSubmitting(true);

//       const response = await fetch(
//         `${API_URL}/api/v1/users/auth/onboarding/${currentUser?.user.email}`,
//         {
//           method: "PATCH",
//           body: formData,
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         toast.success("Onboarding completed successfully!");
//         // Refresh user data to update isOnboarded status
//         await fetchCurrentUser();

//         // Short delay to ensure state is updated before navigation
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to complete onboarding.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="bg-[#F5F7FA] grid md:grid-cols-[4fr_8fr] relative">
//       <aside className="bg-slate-800 md:h-screen p-6 md:px-16 md:py-16">
//         <h1 className="text-2xl text-left text-[#212529]">
//           <span className="text-4xl text-white font-bold">Welcome to</span>
//           <br />
//           <span className="text-lg text-zinc-100">
//             LAGOS STATE PROFESSIONAL PHOTOGRAPHERS
//             <br /> ASSOCIATION OF NIGERIA
//           </span>
//         </h1>
//         <p className="mt-6 text-white text-sm">
//           Tell us a little about yourself to complete your onboarding
//         </p>
//       </aside>
//       <div className="px-4 md:pt-16 pb-16 h-screen overflow-y-auto">
//         <div className="mx-auto max-w-[680px] w-full">
//           <div className="mt-3 md:mt-0 bg-cyan-100 rounded-lg w-full p-6 border border-slate-300">
//             <div className="flex space-x-4">
//               <Info />
//               <p className="text-lg text-[#515F69]">
//                 Please answer these questions to complete your membership
//                 registration
//               </p>
//             </div>
//           </div>
//           <div className="space-y-4 mt-8">
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//               <div className="flex flex-col space-y-2">
//                 <Lable label="First name" />
//                 <TextInput
//                   type="text"
//                   placeholderText="Enter firstname"
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                 />
//                 {errors.firstname && (
//                   <p className="text-red-500">{errors.firstname}</p>
//                 )}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Last name" />
//                 <TextInput
//                   type="text"
//                   placeholderText="Enter last name"
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                 />
//                 {errors.lastname && (
//                   <p className="text-red-500">{errors.lastname}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Select title" />
//                 <select
//                   value={""}
//                   onChange={(e) => console.log("hshd")}
//                   className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
//                 >
//                   <option value="">--Select title--</option>
//                   <option value="Mr">Mr</option>
//                   <option value="Mrs">Mrs</option>
//                   <option value="Ms">Ms</option>
//                   <option value="Master">Master</option>
//                   <option value="Fr">Fr</option>
//                   <option value="Sr">Sr</option>
//                   <option value="Dr">Dr</option>
//                   <option value="Chief">Chief</option>
//                   <option value="Otunba">Otunba</option>
//                   <option value="Yeye">Yeye</option>
//                   {/* <option value="Other">Other</option> */}
//                 </select>
//                 {errors.title && <p className="text-red-500">{errors.title}</p>}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Date of Birth" />
//                 <TextInput
//                   type="date"
//                   placeholderText="Enter Date of Birth"
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                   className="w-full"
//                 />
//                 {errors.Dob && <p className="text-red-500">{errors.Dob}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Gender" />
//                 <select
//                   value={""}
//                   onChange={(e) => console.log(e)}
//                   className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
//                 >
//                   <option>--Select Gender--</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </select>
//                 {errors.gender && (
//                   <p className="text-red-500">{errors.gender}</p>
//                 )}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Whatsapp Number, Eg:+234 807 498 3773" />
//                 <InternationalTelephoneInput
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                 />
//                 {errors.whatsappId && (
//                   <p className="text-red-500">{errors.whatsappId}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-[8fr_4fr]">
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Studio Name / Photograpy Name" />
//                 <TextInput
//                   type="text"
//                   placeholderText="What is your business name?"
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                   className="w-full"
//                 />
//                 {errors.studio && (
//                   <p className="text-red-500">{errors.studio}</p>
//                 )}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <Lable label="State in Nigeria" />
//                 <select
//                   name="bloodGroup"
//                   id="bloodGroup"
//                   value={""}
//                   onChange={(e) => console.log(e)}
//                   className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
//                 >
//                   {/* <option>--Select State--</option> */}
//                   {states}
//                 </select>

//                 {errors.bloodgroup && (
//                   <p className="text-red-500">{errors.bloodgroup}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-2 md:grid-cols-[4fr_8fr]">
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Zone" />
//                 <select
//                   value={""}
//                   onChange={(e) => console.log(e)}
//                   className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
//                 >
//                   <option>--Select Zone--</option>
//                   {zone}
//                 </select>
//                 {errors.gender && (
//                   <p className="text-red-500">{errors.gender}</p>
//                 )}
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <Lable label="Address" />
//                 <TextInput
//                   type="text"
//                   placeholderText="What is your Address?"
//                   value={""}
//                   handleInputChange={(e) => console.log("hshd")}
//                   className="w-full"
//                 />
//                 {errors.bloodgroup && (
//                   <p className="text-red-500">{errors.bloodgroup}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between mt-14">
//             <Button type="button" text={"Submit"} className={`w-full`} />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default OnboardingWelcome;

import { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../context/AdminContext";
import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import InternationalTelephoneInput from "../../components/Input/InternatioanlTelephoneInput";
import { NIGERIANSTATES } from "../../util/nigerianStates";
import useFetchAppData from "../../hooks/useFetchAppData";

const API_URL = process.env.REACT_APP_CLIENT_URL;

export interface FormValues {
  firstname: string;
  lastname: string;
  title: string;
  studio_name: string;
  dob: string;
  whatsappId: string;
  gender: string;
  state: string;
  location: string;
  address: string;
}

// Define error type to match form fields
export interface FormErrors {
  firstname?: string;
  lastname?: string;
  title?: string;
  studio_name?: string;
  dob?: string;
  whatsappId?: string;
  gender?: string;
  state?: string;
  location?: string;
  address?: string;
}

function OnboardingWelcome() {
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { appData } = useFetchAppData();
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  // Initialize form state
  const [formData, setFormData] = useState<FormValues>({
    firstname: "",
    lastname: "",
    title: "",
    studio_name: "",
    dob: "",
    whatsappId: "",
    gender: "",
    state: NIGERIANSTATES[0] || "",
    location: "",
    address: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle phone input change
  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      whatsappId: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.whatsappId.trim())
      newErrors.whatsappId = "WhatsApp number is required";
    if (!formData.studio_name.trim())
      newErrors.studio_name = "Studio name is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.location) newErrors.location = "Zone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    // WhatsApp number format validation (basic)
    if (formData.whatsappId && !formData.whatsappId.startsWith("+")) {
      newErrors.whatsappId =
        "WhatsApp number must include country code (e.g. +234)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // State list options
  const stateOptions = NIGERIANSTATES.map((state, index) => (
    <option key={index} value={state}>
      {state}
    </option>
  ));

  // Zone options from appData
  const zoneOptions =
    appData?.secretaries?.map((secretary, index) => (
      <option key={index} value={secretary.area}>
        {secretary.area}
      </option>
    )) || [];

  // Modified handleSubmit to fix the FormData issue with proper typing
  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data object
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      const response = await fetch(
        `${API_URL}/api/v1/users/auth/onboarding/${currentUser?.user.email}`,
        {
          method: "PATCH",
          body: submitData,
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.success("Onboarding completed successfully!");
        // Refresh user data to update isOnboarded status
        await fetchCurrentUser();

        // Navigate after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F5F7FA] grid md:grid-cols-[4fr_8fr] relative">
      <aside className="bg-slate-800 md:h-screen p-6 md:px-16 md:py-16">
        <h1 className="text-2xl text-left text-[#212529]">
          <span className="text-4xl text-white font-bold">Welcome to</span>
          <br />
          <span className="text-lg text-zinc-100">
            LAGOS STATE PROFESSIONAL PHOTOGRAPHERS
            <br /> ASSOCIATION OF NIGERIA
          </span>
        </h1>
        <p className="mt-6 text-white text-sm">
          Tell us a little about yourself to complete your onboarding
        </p>
      </aside>
      <div className="px-4 md:pt-16 pb-16 h-screen overflow-y-auto">
        <div className="mx-auto max-w-[680px] w-full">
          <div className="mt-3 md:mt-0 bg-cyan-100 rounded-lg w-full p-6 border border-slate-300">
            <div className="flex space-x-4">
              <Info />
              <p className="text-lg text-[#515F69]">
                Please answer these questions to complete your membership
                registration
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            {/* First name and last name */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <Lable label="First name" />
                <TextInput
                  type="text"
                  name="firstname"
                  placeholderText="Enter first name"
                  value={formData.firstname}
                  handleInputChange={handleInputChange}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Lable label="Last name" />
                <TextInput
                  type="text"
                  name="lastname"
                  placeholderText="Enter last name"
                  value={formData.lastname}
                  handleInputChange={handleInputChange}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname}</p>
                )}
              </div>
            </div>

            {/* Title and DOB */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <Lable label="Select title" />
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                >
                  <option value="">--Select title--</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Master">Master</option>
                  <option value="Fr">Fr</option>
                  <option value="Sr">Sr</option>
                  <option value="Dr">Dr</option>
                  <option value="Chief">Chief</option>
                  <option value="Otunba">Otunba</option>
                  <option value="Yeye">Yeye</option>
                </select>
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Lable label="Date of Birth" />
                <TextInput
                  type="date"
                  name="dob"
                  placeholderText="Enter Date of Birth"
                  value={formData.dob}
                  handleInputChange={handleInputChange}
                  className="w-full"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )}
              </div>
            </div>

            {/* Gender and WhatsApp */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <Lable label="Gender" />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Lable label="WhatsApp Number, Eg:+234 807 498 3773" />
                <InternationalTelephoneInput
                  value={formData.whatsappId}
                  handleInputChange={handlePhoneChange}
                />
                {errors.whatsappId && (
                  <p className="text-red-500 text-sm">{errors.whatsappId}</p>
                )}
              </div>
            </div>

            {/* Studio name and State */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[8fr_4fr]">
              <div className="flex flex-col space-y-2">
                <Lable label="Studio Name / Photography Name" />
                <TextInput
                  type="text"
                  name="studio_name"
                  placeholderText="What is your business name?"
                  value={formData.studio_name}
                  handleInputChange={handleInputChange}
                  className="w-full"
                />
                {errors.studio_name && (
                  <p className="text-red-500 text-sm">{errors.studio_name}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Lable label="State in Nigeria" />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                >
                  <option value="">--Select State--</option>
                  {stateOptions}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Zone and Address */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[4fr_8fr]">
              <div className="flex flex-col space-y-2">
                <Lable label="Zone" />
                <select
                  name="zone"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
                >
                  <option value="">--Select Zone--</option>
                  {zoneOptions}
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Lable label="Address" />
                <TextInput
                  type="text"
                  name="address"
                  placeholderText="What is your address?"
                  value={formData.address}
                  handleInputChange={handleInputChange}
                  className="w-full"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-14">
            <Button
              type="button"
              text={isSubmitting ? "Submitting..." : "Submit"}
              className="w-full"
              handleClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default OnboardingWelcome;
