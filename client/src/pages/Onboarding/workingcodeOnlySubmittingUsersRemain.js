import React, { useState } from "react";
import Button from "../../components/Button/Button";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepTwo from "./OnboardingStepTwo";
import OnboardingStepThree from "./OnboardingStepThree";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

const API_URL = process.env.REACT_APP_CLIENT_URL;

interface StepOneValues {
  firstName: string;
  lastName: string;
  title: string;
  dateOfEntry: string;
}

interface FamilyMember {
  firstName: string;
  lastName: string;
  title: string;
  dateOfEntry: string;
  emailId: string;
  whatsappId: string;
  relationship: string;
  dateOfBirth: string;
}

interface StepTwoValues {
  familyInLagos: boolean | null;
  familyMembers: FamilyMember[];
}

interface StepThreeValues {
  emergencyContactInIndia: string;
  districtInIndia: string;
  addressInIndia: string;
}

function OnboardingWelcome() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneValues>({
    firstName: "",
    lastName: "",
    title: "",
    dateOfEntry: "",
  });
  const [stepTwoData, setStepTwoData] = useState<StepTwoValues>({
    familyInLagos: null,
    familyMembers: [],
  });
  const [stepThreeData, setStepThreeData] = useState<StepThreeValues>({
    emergencyContactInIndia: "",
    districtInIndia: "",
    addressInIndia: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  console.log(errors);
  // Validate Step 1
  const validateStepOne = (data: StepOneValues) => {
    const errors: { [key: string]: string } = {};
    if (!data.firstName) errors.firstName = "First name is required";
    if (!data.lastName) errors.lastName = "Last name is required";
    if (!data.title) errors.title = "Title is required";
    if (!data.dateOfEntry) errors.dateOfEntry = "Date of entry is required";
    return errors;
  };

  // Validate Step 2
  const validateStepTwo = (data: StepTwoValues) => {
    const errors: { [key: string]: string } = {};

    // Validate familyInLagos field
    if (data.familyInLagos === null) {
      errors.familyInLagos = "This field is required";
    } else if (data.familyInLagos === true) {
      // Validate family members
      if (data.familyMembers.length === 0) {
        errors.familyMembers = "At least one family member is required";
      } else {
        data.familyMembers.forEach((member, index) => {
          if (!member.firstName) {
            errors[`familyMembers[${index}].firstName`] =
              "First name is required";
          }
          if (!member.lastName) {
            errors[`familyMembers[${index}].lastName`] =
              "Last name is required";
          }
          if (!member.title) {
            errors[`familyMembers[${index}].title`] = "Title is required";
          }
          if (!member.dateOfEntry) {
            errors[`familyMembers[${index}].dateOfEntry`] =
              "Date of entry is required";
          }
          if (!member.emailId) {
            errors[`familyMembers[${index}].emailId`] = "Email is required";
          }
          if (!member.whatsappId) {
            errors[`familyMembers[${index}].whatsappId`] =
              "WhatsApp number is required";
          }
          if (!member.relationship) {
            errors[`familyMembers[${index}].relationship`] =
              "Relationship is required";
          }
          if (!member.dateOfBirth) {
            errors[`familyMembers[${index}].dateOfBirth`] =
              "Date of birth is required";
          }
        });
      }
    }

    return errors;
  };

  // Validate Step 3
  const validateStepThree = (data: StepThreeValues) => {
    const errors: { [key: string]: string } = {};
    if (!data.emergencyContactInIndia)
      errors.emergencyContactInIndia = "Emergency contact is required";
    if (!data.districtInIndia) errors.districtInIndia = "District is required";
    if (!data.addressInIndia) errors.addressInIndia = "Address is required";
    return errors;
  };

  // Handle next button click
  const handleNext = () => {
    if (currentStep === 1) {
      const stepOneErrors = validateStepOne(stepOneData);
      if (Object.keys(stepOneErrors).length > 0) {
        setErrors(stepOneErrors);
        return;
      }
      setErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const stepTwoErrors = validateStepTwo(stepTwoData);
      if (Object.keys(stepTwoErrors).length > 0) {
        setErrors(stepTwoErrors);
        return;
      }
      setErrors({});
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const stepThreeErrors = validateStepThree(stepThreeData);
      if (Object.keys(stepThreeErrors).length > 0) {
        setErrors(stepThreeErrors);
        return;
      }
      handleSubmit();
    }
  };

  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append Step 1 data
    Object.entries(stepOneData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString()); // Ensure value is a string
      }
    });

    // Append Step 2 data
    Object.entries(stepTwoData).forEach(([key, value]) => {
      if (key === "familyMembers") {
        // Append each family member's data
        (value as FamilyMember[]).forEach((member, index) => {
          Object.entries(member).forEach(([memberKey, memberValue]) => {
            if (memberValue !== null && memberValue !== undefined) {
              formData.append(
                `familyMembers[${index}][${memberKey}]`,
                memberValue.toString()
              ); // Ensure value is a string
            }
          });
        });
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString()); // Ensure value is a string
      }
    });

    // Append Step 3 data
    Object.entries(stepThreeData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString()); // Ensure value is a string
      }
    });

    // Log FormData for debugging
    for (const [key, value] of Array.from(formData.entries())) {
      console.log(key, value);
    }

    console.log(formData);
    // Submit to API
    // try {
    //   const response = await fetch(`${API_URL}/api/v1/users`, {
    //     method: "PUT",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     alert("Form submitted successfully!");
    //     navigate("/");
    //   } else {
    //     alert("Failed to submit form.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <main className="bg-[#F5F7FA] grid md:grid-cols-[4fr_8fr] relative">
      <aside className="bg-slate-800 h-screen p-6 md:px-16 md:py-16">
        <h1 className="text-2xl text-left text-[#212529]">
          <span className="text-4xl text-white font-bold">Welcome to</span>{" "}
          <br />
          <span className="text-lg text-zinc-100">KERALA SAMAJAM NIGERIA</span>
        </h1>
        <p className="mt-6 text-white text-sm">
          Tell us a little about yourself to setup your profile
        </p>
      </aside>
      <div className="md:pt-16 pb-16 h-screen overflow-y-auto">
        <div className="mx-auto max-w-[680px] w-full bg-slate-50">
          <div className="bg-cyan-100 rounded-lg w-full p-6 border border-slate-300 items-center">
            <div className="flex space-x-4">
              <Info />
              <p className="text-lg text-[#515F69]">
                Please answer these questions to complete your membership
                registration
              </p>
            </div>
          </div>

          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-6">
            <div
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <p className="text-green-700">Step {currentStep} of 3</p>

          {/* Render current step component */}
          {currentStep === 1 && (
            <OnboardingStepOne
              data={stepOneData}
              setData={setStepOneData}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <OnboardingStepTwo
              data={stepTwoData}
              setData={setStepTwoData}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <OnboardingStepThree
              data={stepThreeData}
              setData={setStepThreeData}
              errors={errors}
            />
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-14">
            {currentStep > 1 && (
              <Button
                type="button"
                text="Previous"
                handleClick={handlePrevious}
                className="w-1/3"
              />
            )}
            <Button
              type="button"
              text={currentStep === 3 ? "Submit" : "Next"}
              handleClick={handleNext}
              className={`w-1/3 ${currentStep === 1 ? "ml-auto" : ""}`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default OnboardingWelcome;



import React from "react";
import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";

interface StepOneProps {
  data: {
    firstName: string;
    lastName: string;
    title: string;
    dateOfEntry: string;
  };
  setData: (data: {
    firstName: string;
    lastName: string;
    title: string;
    dateOfEntry: string;
  }) => void;
  errors: { [key: string]: string };
}

function OnboardingStepOne({ data, setData, errors }: StepOneProps) {
  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <section>
      <div className="pt-8 space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="First name" />
            <TextInput
              type="text"
              placeholderText="Enter firstname"
              value={data.firstName}
              handleInputChange={(e) =>
                handleChange("firstName", e.target.value)
              }
              error={errors.firstName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Last name" />
            <TextInput
              type="text"
              placeholderText="Enter last name"
              value={data.lastName}
              handleInputChange={(e) =>
                handleChange("lastName", e.target.value)
              }
              error={errors.lastName}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Select title" />
            <select
              className="px-3 h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
            >
              <option value="">Select title</option>
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="MS">MS</option>
              <option value="MASTER">MASTER</option>
              <option value="DR">DR</option>
              <option value="CHIEF">CHIEF</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Date of first entry to Nigeria" />
            <TextInput
              type="date"
              value={data.dateOfEntry}
              handleInputChange={(e) =>
                handleChange("dateOfEntry", e.target.value)
              }
              error={errors.dateOfEntry}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingStepOne;


import React, { useState } from "react";
import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import Button from "../../components/Button/Button";
import FamilyMembersInfo from "./FamilyMembersInfo";

interface StepTwoProps {
  data: {
    familyInLagos: boolean | null;
    familyMembers: {
      firstName: string;
      lastName: string;
      title: string;
      dateOfEntry: string;
      emailId: string;
      whatsappId: string;
      relationship: string;
      dateOfBirth: string;
    }[];
  };
  setData: (data: {
    familyInLagos: boolean | null;
    familyMembers: {
      firstName: string;
      lastName: string;
      title: string;
      dateOfEntry: string;
      emailId: string;
      whatsappId: string;
      relationship: string;
      dateOfBirth: string;
    }[];
  }) => void;
  errors: { [key: string]: string };
}

function OnboardingStepTwo({ data, setData, errors }: StepTwoProps) {
  const [familyMembers, setFamilyMembers] = useState(data.familyMembers);

  const handleFamilyInLagosChange = (value: boolean) => {
    setData({ ...data, familyInLagos: value });
    if (!value) {
      setFamilyMembers([]);
    }
  };

  const handleAddFamilyMember = () => {
    const newMember = {
      firstName: "",
      lastName: "",
      title: "",
      dateOfEntry: "",
      emailId: "",
      whatsappId: "",
      relationship: "",
      dateOfBirth: "",
    };
    setFamilyMembers([...familyMembers, newMember]);
    setData({ ...data, familyMembers: [...familyMembers, newMember] });
  };

  const handleRemoveFamilyMember = (index: number) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
    setData({ ...data, familyMembers: updatedMembers });
  };

  const handleFamilyMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFamilyMembers(updatedMembers);
    setData({ ...data, familyMembers: updatedMembers });
  };

  return (
    <section>
      <div className="pt-8 space-y-4">
        {/* Family in Lagos? */}
        <div>
          <p className="mb-2">Is your Family here in Lagos?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-row gap-2 w-full border border-slate-400 p-6 rounded-lg">
              <Lable label="YES" />
              <TextInput
                type="radio"
                name="familyInLagos"
                value="YES"
                checked={data.familyInLagos === true}
                handleInputChange={() => handleFamilyInLagosChange(true)}
              />
            </div>
            <div className="flex flex-row gap-2 w-full border border-slate-400 p-6 rounded-lg">
              <Lable label="NO" />
              <TextInput
                type="radio"
                name="familyInLagos"
                value="NO"
                checked={data.familyInLagos === false}
                handleInputChange={() => handleFamilyInLagosChange(false)}
              />
            </div>
          </div>
          {errors.familyInLagos && (
            <p className="text-sm text-red-500">{errors.familyInLagos}</p>
          )}
        </div>

        {/* Show "Add family member Info" button and span if user selects YES */}
        {data.familyInLagos && (
          <div className="flex gap-6 items-center">
            <Button
              text="Add family member Info"
              className="px-8 bg-green-600"
              handleClick={handleAddFamilyMember}
            />
            <span className="text-lg rounded-full w-8 h-8 flex items-center justify-center p-2 bg-green-200">
              {familyMembers.length}
            </span>
          </div>
        )}

        {/* Dynamically render FamilyMembersInfo components */}
        <div className="pt-8 space-y-4">
          {familyMembers.map((member, index) => (
            <FamilyMembersInfo
              key={index}
              index={index}
              member={member}
              onChange={(field, value) =>
                handleFamilyMemberChange(index, field, value)
              }
              onRemove={() => handleRemoveFamilyMember(index)}
              errors={errors}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OnboardingStepTwo;



import React from "react";
import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";
import { X } from "lucide-react";

interface FamilyMembersInfoProps {
  index: number;
  member: {
    firstName: string;
    lastName: string;
    title: string;
    dateOfEntry: string;
    emailId: string;
    whatsappId: string;
    relationship: string;
    dateOfBirth: string;
  };
  onChange: (field: string, value: string) => void;
  onRemove: () => void;
  errors: { [key: string]: string };
}

function FamilyMembersInfo({
  index,
  member,
  onChange,
  onRemove,
  errors,
}: FamilyMembersInfoProps) {
  return (
    <section className="border border-slate-300 bg-white rounded-lg p-4">
      <div className="flex justify-end">
        <div
          className="bg-slate-50 w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-full p-3"
          onClick={onRemove}
        >
          <X size={32} />
        </div>
      </div>
      <div className=" space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="First name" />
            <TextInput
              type="text"
              placeholderText="Enter firstname"
              value={member.firstName}
              handleInputChange={(e) => onChange("firstName", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].firstName`]}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Last name" />
            <TextInput
              type="text"
              placeholderText="Enter last name"
              value={member.lastName}
              handleInputChange={(e) => onChange("lastName", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].lastName`]}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Select title" />

            <select
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
              value={member.title}
              onChange={(e) => onChange("title", e.target.value)}
            >
              <option value="">Select title</option>
              <option>MR</option>
              <option>MRS</option>
              <option>MS</option>
              <option>MASTER</option>
              <option>DR</option>
              <option>CHIEF</option>
              <option>OTHER</option>
            </select>
            <span>{errors[`familyMembers[${index}].title`]}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Date of first entry to Nigeria" />
            <TextInput
              type="date"
              value={member.dateOfEntry}
              handleInputChange={(e) => onChange("dateOfEntry", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].dateOfEntry`]}</span>
          </div>
        </div>
      </div>
      <div className="pt-8 space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Email ID" />
            <TextInput
              type="text"
              placeholderText="Enter email address"
              value={member.emailId}
              handleInputChange={(e) => onChange("emailId", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].emailId`]}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Whatsapp Number" />
            <TextInput
              type="text"
              placeholderText="Enter whatsapp number"
              value={member.whatsappId}
              handleInputChange={(e) => onChange("whatsappId", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].whatsappId`]}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Relationship with family member" />

            <select
              className={` px-3  h-12 outline-[#90BFE9] rounded-lg border border-[#515F69] bg-[#F4F6F7] font-[#A6B4BA]`}
              value={member.relationship}
              onChange={(e) => onChange("relationship", e.target.value)}
            >
              <option value="">Select the relationship</option>
              <option>Husband</option>
              <option>Wife</option>
              <option>Son</option>
              <option>Daughterer</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Others</option>
            </select>
            <span>{errors[`familyMembers[${index}].relationship`]}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="Date of Birth" />
            <TextInput
              type="date"
              placeholderText="Enter Date of Birth"
              value={member.dateOfBirth}
              handleInputChange={(e) => onChange("dateOfBirth", e.target.value)}
            />
            <span>{errors[`familyMembers[${index}].dateOfBirth`]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FamilyMembersInfo;



import React from "react";
import Lable from "../../components/Lable/Lable";
import TextInput from "../../components/Input/TextInput";

interface StepThreeProps {
  data: {
    emergencyContactInIndia: string;
    districtInIndia: string;
    addressInIndia: string;
  };
  setData: (data: {
    emergencyContactInIndia: string;
    districtInIndia: string;
    addressInIndia: string;
  }) => void;
  errors: { [key: string]: string };
}

function OnboardingStepThree({ data, setData, errors }: StepThreeProps) {
  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <section>
      <div className="pt-8 space-y-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Emergency Contact in India" />
            <TextInput
              type="text"
              placeholderText="Enter emergency contact"
              value={data.emergencyContactInIndia}
              handleInputChange={(e) =>
                handleChange("emergencyContactInIndia", e.target.value)
              }
            />

            {errors.emergencyContactInIndia && (
              <span className="text-rose-500">{errors.districtInIndia}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Lable label="District in India" />
            <TextInput
              type="text"
              placeholderText="Enter district"
              value={data.districtInIndia}
              handleInputChange={(e) =>
                handleChange("districtInIndia", e.target.value)
              }
            />
            {errors.districtInIndia && (
              <span className="text-rose-500">{errors.districtInIndia}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-2">
            <Lable label="Address in India" />
            <TextInput
              type="text"
              placeholderText="Enter address"
              value={data.addressInIndia}
              handleInputChange={(e) =>
                handleChange("addressInIndia", e.target.value)
              }
            />
            {errors.addressInIndia && (
              <span className="text-rose-500">{errors.addressInIndia}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingStepThree;
