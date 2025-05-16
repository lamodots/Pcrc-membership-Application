import React, { useEffect, useState } from "react";
import { Pencil, Save, X, Upload } from "lucide-react";
import { useCurrentUser } from "../../context/AdminContext";
import toast from "react-hot-toast";
import Lable from "../../components/Lable/Lable";
import avatar from "../../assets/avatar_default.png";
import useFetchAppData from "../../hooks/useFetchAppData";
// Define interfaces for FamilyMember and User
interface FamilyMember {
  firstName: string;
  lastName: string;
  title: string;
  dateOfEntry: string;
  relationship: string;
  whatsappId: string;
  emailId: string;
  image?: string;

  dateOfBirth: string;
  bloodgroup: string;
}

interface User {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  title: string;
  dob: string;
  location: string;
  address: string;
  whatsappId: string;
  email: string;
  state: string;
  familyInLagos: boolean;
  familyMembers: FamilyMember[];
  password?: string;
  confirmPassword?: string;
  memberId?: string;
  studio_name: string;
}

// Validation error interfaces
interface ValidationErrors {
  firstname?: string;
  lastname?: string;
  title?: string;
  dob?: string;
  location?: string;
  address?: string;
  whatsappId?: string;
  email?: string;
  state?: string;
  password?: string;
  confirmPassword?: string;
  studio_name?: string;
}

// interface FamilyMemberErrors {
//   [index: number]: {
//     firstName?: string;
//     lastName?: string;
//     title?: string;
//     dateOfEntry?: string;
//     relationship?: string;
//     dateOfBirth?: string;
//     gender?: string;
//   };
// }
interface FamilyMemberErrors {
  [index: number]: Partial<Record<keyof FamilyMember, string>>;
}
// Helper function to safely format dates
const formatDate = (dateValue: any) => {
  if (!dateValue) return "";
  try {
    // Handle both string dates and Date objects
    const date =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    // Check if date is valid before calling toISOString
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};

// Props for FamilyMemberForm
interface FamilyMemberFormProps {
  member: FamilyMember;
  index: number;
  isEditing: boolean;
  onChange: (index: number, field: keyof FamilyMember, value: string) => void;
  onImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemove: (index: number) => void;
  previewImages: { [key: number]: string };
  errors: { [key: string]: string } | undefined;
}

// Helper function to validate email
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper function to validate phone number
const validatePhone = (phone: string): boolean => {
  // Basic validation for phone - at least 10 digits
  const re = /^\d{10,}$/;
  return re.test(phone.replace(/\D/g, ""));
};

// Reusable Family Member Form Component
const FamilyMemberForm = ({
  member,
  index,
  isEditing,
  onChange,
  onImageUpload,
  onRemove,
  previewImages,
  errors,
}: FamilyMemberFormProps) => (
  <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
    <div className="flex flex-col md:flex-row items-center mb-4">
      <div className="relative">
        <img
          src={previewImages[index] || member.image || avatar}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        {isEditing && (
          <>
            <label
              htmlFor={`family-member-image-upload-${index}`}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
            >
              <Upload />
            </label>
            <span className="text-xs absolute  bottom-0 left-0  text-orange-500">
              Upload photo
            </span>
            <input
              id={`family-member-image-upload-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onImageUpload(index, e)}
            />
          </>
        )}
      </div>
      <div className="w-full">
        {isEditing ? (
          <>
            <div>
              <Lable label="First Name *" />
              <input
                type="text"
                value={member.firstName}
                onChange={(e) => onChange(index, "firstName", e.target.value)}
                placeholder="First Name"
                className={`border ${
                  errors?.firstName ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
              />
              {errors?.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Lable label="Last Name *" />
              <input
                type="text"
                value={member.lastName}
                onChange={(e) => onChange(index, "lastName", e.target.value)}
                placeholder="Last Name"
                className={`border ${
                  errors?.lastName ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
              />
              {errors?.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            <div>
              <Lable label="Select title *" />
              <select
                className={`border ${
                  errors?.title ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
                value={member.title}
                onChange={(e) => onChange(index, "title", e.target.value)}
              >
                <option value="">--Select title--</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Master">Master</option>
                <option value="Dr">Dr</option>
                <option value="Chief">Chief</option>
                <option value="Otunba">Otunba</option>
                <option value="Yeye">Yeye</option>
                <option value="Miss">Miss</option>
              </select>
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div>
              <Lable label="Date of first entry to Nigeria *" />
              <input
                type="date"
                value={formatDate(member.dateOfEntry)}
                onChange={(e) => onChange(index, "dateOfEntry", e.target.value)}
                className={`border ${
                  errors?.dateOfEntry ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
              />
              {errors?.dateOfEntry && (
                <p className="text-red-500 text-sm">{errors.dateOfEntry}</p>
              )}
            </div>
            <div>
              <Lable label="Relationship *" />
              <select
                value={member.relationship}
                onChange={(e) =>
                  onChange(index, "relationship", e.target.value)
                }
                className={`border ${
                  errors?.relationship ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
              >
                <option value="">Select the relationship</option>
                <option value="Husband">Husband</option>
                <option value="Wife">Wife</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
              </select>
              {errors?.relationship && (
                <p className="text-red-500 text-sm">{errors.relationship}</p>
              )}
            </div>
            <div>
              <Lable label="Date of Birth *" />
              <input
                className={`border ${
                  errors?.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
                type="date"
                value={formatDate(member.dateOfBirth)}
                onChange={(e) => onChange(index, "dateOfBirth", e.target.value)}
              />
              {errors?.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
              )}
            </div>
            {/* <div>
              <Lable label="Gender *" />
              <select
                value={member.gender}
                onChange={(e) => onChange(index, "gender", e.target.value)}
                className={`border ${
                  errors?.gender ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mb-2 w-full`}
              >
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors?.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div> */}
            <div>
              <Lable label="Whatsapp Phone" />
              <input
                type="text"
                value={member.whatsappId}
                onChange={(e) => onChange(index, "whatsappId", e.target.value)}
                placeholder="WhatsApp ID"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
            </div>
            <div>
              <Lable label="Email" />
              <input
                type="email"
                value={member.emailId}
                onChange={(e) => onChange(index, "emailId", e.target.value)}
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
              />
            </div>
          </>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              {member.title} {member.firstName} {member.lastName}
            </h3>
            <p className="text-gray-600">Relationship: {member.relationship}</p>
            <p className="text-gray-600">WhatsApp: {member.whatsappId}</p>
            <p className="text-gray-600">Email: {member.emailId}</p>
          </div>
        )}
      </div>
    </div>
    {isEditing && (
      <button onClick={() => onRemove(index)} className="text-red-500 mt-2">
        Remove Family Member
      </button>
    )}
  </div>
);

const API_URL = process.env.REACT_APP_CLIENT_URL;

function Profile() {
  const { currentUser } = useCurrentUser();
  const { appData } = useFetchAppData();
  console.log();
  // Fetch Location from Database
  const area = appData?.secretaries.map((v, i) => (
    <option key={i}>{v.area}</option>
  ));
  // Initialize user state with a default structure to avoid undefined errors
  const [user, setUser] = useState<User>({
    _id: "",
    image: "",
    firstname: "",
    lastname: "",
    title: "",
    dob: "",
    location: "",
    address: "",
    whatsappId: "",
    email: "",
    state: "",
    familyInLagos: false,
    familyMembers: [],
    password: "",
    confirmPassword: "",
    memberId: "",
    studio_name: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [familyMemberErrors, setFamilyMemberErrors] =
    useState<FamilyMemberErrors>({});

  // Add states for file uploads and preview images
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [familyMemberImageFiles, setFamilyMemberImageFiles] = useState<{
    [key: number]: File;
  }>({});
  const [familyMemberPreviews, setFamilyMemberPreviews] = useState<{
    [key: number]: string;
  }>({});

  // Fetch user profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke object URLs to avoid memory leaks
      if (profilePreview && profilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }

      Object.values(familyMemberPreviews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [profilePreview, familyMemberPreviews]);

  // Fetch user profile data from the API
  const fetchUserProfile = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const { data } = await response.json();

      setUser(data);
    } catch (error: any) {
      setApiError(error.message || "An error occurred while fetching data.");
    } finally {
      setIsFetching(false);
    }
  };

  // Handle input changes for user fields
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof ValidationErrors];
        return updated;
      });
    }
  };

  // Handle image upload for the user with preview
  const handleUserImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
      setProfileImageFile(file);
    }
  };

  // Handle input changes for family members
  const handleFamilyMemberChange = (
    index: number,
    field: keyof FamilyMember,
    value: string
  ) => {
    const updatedFamilyMembers = [...user.familyMembers];
    updatedFamilyMembers[index][field] = value;
    setUser((prevUser) => ({
      ...prevUser,
      familyMembers: updatedFamilyMembers,
    }));

    // Clear validation error for this field when user starts typing
    if (familyMemberErrors[index]?.[field]) {
      setFamilyMemberErrors((prev) => {
        const updated = { ...prev };
        if (updated[index]) {
          delete (
            updated[index] as Partial<Record<keyof FamilyMember, string>>
          )[field];
          // If no more errors for this member, remove the index
          if (Object.keys(updated[index]).length === 0) {
            delete updated[index];
          }
        }
        return updated;
      });
    }
  };

  // Handle image upload for family members with preview
  const handleFamilyMemberImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Store preview URL
      setFamilyMemberPreviews((prev) => ({
        ...prev,
        [index]: previewUrl,
      }));

      // Store file for upload
      setFamilyMemberImageFiles((prev) => ({
        ...prev,
        [index]: file,
      }));
    }
  };

  // Add a new family member
  const addFamilyMember = () => {
    setUser((prevUser) => ({
      ...prevUser,
      familyMembers: [
        ...prevUser.familyMembers,
        {
          firstName: "",
          lastName: "",
          title: "",
          dateOfEntry: "",
          relationship: "",
          whatsappId: "",
          emailId: "",
          image: "",

          dateOfBirth: "",
          bloodgroup: "",
        },
      ],
    }));
  };

  // Remove a family member
  const removeFamilyMember = (index: number) => {
    const updatedFamilyMembers = user.familyMembers.filter(
      (_, i) => i !== index
    );
    setUser((prevUser) => ({
      ...prevUser,
      familyMembers: updatedFamilyMembers,
    }));

    // Clean up any preview and file for this index
    if (familyMemberPreviews[index]) {
      URL.revokeObjectURL(familyMemberPreviews[index]);
      setFamilyMemberPreviews((prev) => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }

    setFamilyMemberImageFiles((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });

    // Remove any validation errors for this family member
    setFamilyMemberErrors((prev) => {
      const updated = { ...prev };
      delete updated[index];
      // Renumber the keys for family members after the removed one
      Object.keys(updated).forEach((key) => {
        const numKey = parseInt(key);
        if (numKey > index) {
          updated[numKey - 1] = updated[numKey];
          delete updated[numKey];
        }
      });
      return updated;
    });
  };

  // Reset edit state and form
  const cancelEditing = () => {
    setIsEditing(false);

    // Reset all previews
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
      setProfilePreview("");
    }

    Object.values(familyMemberPreviews).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });

    setFamilyMemberPreviews({});
    setFamilyMemberImageFiles({});
    setProfileImageFile(null);

    // Clear all validation errors
    setValidationErrors({});
    setFamilyMemberErrors({});
    setPasswordError("");

    // Refetch to restore original data
    fetchUserProfile();
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    const memberErrors: FamilyMemberErrors = {};
    let isValid = true;

    // Validate required user fields
    if (!user.firstname.trim()) {
      errors.firstname = "First name is required";
      isValid = false;
    }

    if (!user.lastname.trim()) {
      errors.lastname = "Last name is required";
      isValid = false;
    }

    if (!user.title) {
      errors.title = "Title is required";
      isValid = false;
    }
    if (!user.studio_name) {
      errors.title = "Profession is required";
      isValid = false;
    }

    if (!user.dob) {
      errors.dob = "Date of birth is required";
      isValid = false;
    }

    if (!user.location.trim()) {
      errors.location = "Location is required";
      isValid = false;
    }

    if (!user.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!user.whatsappId.trim()) {
      errors.whatsappId = "WhatsApp ID is required";
      isValid = false;
    } else if (!validatePhone(user.whatsappId)) {
      errors.whatsappId = "Please enter a valid phone number";
      isValid = false;
    }

    if (!user.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(user.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password and confirm password if either is filled
    if (user.password || user.confirmPassword) {
      if (user.password !== user.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    // Validate family members if any
    // user.familyMembers.forEach((member, index) => {
    //   const memberError: { [key: string]: string } = {};

    //   if (!member.firstName.trim()) {
    //     memberError.firstName = "First name is required";
    //     isValid = false;
    //   }

    //   if (!member.lastName.trim()) {
    //     memberError.lastName = "Last name is required";
    //     isValid = false;
    //   }

    //   if (!member.title) {
    //     memberError.title = "Title is required";
    //     isValid = false;
    //   }

    //   if (!member.dateOfEntry) {
    //     memberError.dateOfEntry = "Date of entry is required";
    //     isValid = false;
    //   }

    //   if (!member.relationship) {
    //     memberError.relationship = "Relationship is required";
    //     isValid = false;
    //   }

    //   // if (!member.gender) {
    //   //   memberError.gender = "Gender is required";
    //   //   isValid = false;
    //   // }

    //   if (!member.dateOfBirth) {
    //     memberError.dateOfBirth = "Date of birth is required";
    //     isValid = false;
    //   }

    //   // Only add to errors if there are any
    //   if (Object.keys(memberError).length > 0) {
    //     memberErrors[index] = memberError;
    //   }
    // });

    setValidationErrors(errors);
    setFamilyMemberErrors(memberErrors);

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();

      // Add user data to FormData
      Object.entries(user).forEach(([key, value]) => {
        if (key === "familyMembers") {
          // We'll handle this separately
        } else if (key !== "image" || (!profileImageFile && key === "image")) {
          // Only add the image field if we're not uploading a new file
          formData.append(key, value as string);
        }
      });

      // Add profile image if selected
      if (profileImageFile) {
        formData.append("image", profileImageFile);
      }

      // Process family members
      // const processedFamilyMembers = user.familyMembers.map((member, index) => {
      //   // Clone the member to avoid modifying the original
      //   const processedMember = { ...member };

      //   // Don't include the image field if we have a file to upload for this member
      //   // The backend will receive the file separately
      //   if (familyMemberImageFiles[index]) {
      //     delete processedMember.image;
      //   }

      //   return processedMember;
      // });

      // formData.append("familyMembers", JSON.stringify(processedFamilyMembers));

      // Add family member images if any

      // Send the request
      const response = await fetch(
        `${API_URL}/api/v1/users/profile/${currentUser?.user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save changes.");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Clean up preview URLs
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }

      Object.values(familyMemberPreviews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });

      // Reset files and previews
      setProfilePreview("");
      setFamilyMemberPreviews({});
      setFamilyMemberImageFiles({});
      setProfileImageFile(null);

      // Clear validation errors
      setValidationErrors({});
      setFamilyMemberErrors({});

      // Refetch to get updated data from server
      fetchUserProfile();
    } catch (error: any) {
      setApiError(error.message || "An error occurred while saving changes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state while fetching data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto ">
      <div className="mt-6 flex justify-between items-center mb-6">
        <h1 className=" text-3xl mb-8 font-bold text-gray-800">Profile</h1>

        <button
          onClick={() => (isEditing ? cancelEditing() : setIsEditing(true))}
          className={`px-4 py-2 rounded ${
            isEditing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          } flex items-center`}
        >
          {isEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className="max-w-2xl mx-auto bg-white border rounded-lg p-6">
        <strong>MEMBERSHIP ID: {user.memberId}</strong>

        <div className="flex flex-col  gap-4 items-center mb-6">
          <div className="relative ">
            <img
              src={profilePreview || user.image || avatar}
              alt={`${user.firstname} ${user.lastname}`}
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />

            {isEditing && (
              <>
                <label
                  htmlFor="user-image-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                >
                  <Upload />
                </label>
                <span className="text-xs  absolute  -bottom-8 left-3  text-orange-800">
                  Upload photo of <br />
                  35mm x 45mm size
                </span>
                <input
                  id="user-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUserImageUpload}
                />
              </>
            )}
          </div>
          <div className="w-full">
            {isEditing ? (
              <>
                <div className="mb-2">
                  <Lable label="First Name *" />
                  <input
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={`border ${
                      validationErrors.firstname
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.firstname && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.firstname}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Last Name *" />
                  <input
                    type="text"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className={`border ${
                      validationErrors.lastname
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.lastname && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.lastname}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Title *" />
                  <select
                    name="title"
                    value={user.title}
                    onChange={handleInputChange}
                    className={`border ${
                      validationErrors.title
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  >
                    <option value="">--Select title--</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Master">Master</option>
                    <option value="Dr">Dr</option>
                    <option value="Chief">Chief</option>
                    <option value="Otunba">Otunba</option>
                    <option value="Yeye">Yeye</option>
                    <option value="Miss">Miss</option>
                  </select>
                  {validationErrors.title && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.title}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <Lable label="Studio Name / Photography Name*" />
                  <input
                    type="text"
                    name="profession"
                    value={user.studio_name}
                    onChange={handleInputChange}
                    placeholder="What you do for a living"
                    className={`border ${
                      validationErrors.studio_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.studio_name && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.studio_name}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <Lable label="Date of Birth *" />
                  <input
                    type="date"
                    name="dob"
                    value={formatDate(user.dob)}
                    onChange={handleInputChange}
                    className={`border ${
                      validationErrors.dob
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.dob && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.dob}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Location *" />
                  {/* <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className={`border ${
                    validationErrors.location
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2 w-full`}
                /> */}
                  <select
                    name="location"
                    value={user.location}
                    onChange={handleInputChange}
                    className={`border ${
                      validationErrors.location
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  >
                    <option>Select your Zone</option>
                    {area}
                  </select>
                  {validationErrors.location && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.location}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Address *" />
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className={`border ${
                      validationErrors.address
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.address && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.address}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="WhatsApp ID *" />
                  <input
                    type="text"
                    name="whatsappId"
                    value={user.whatsappId}
                    onChange={handleInputChange}
                    placeholder="WhatsApp ID"
                    className={`border ${
                      validationErrors.whatsappId
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.whatsappId && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.whatsappId}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Email *" />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`border ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* <div className="mb-2">
                <Lable label="Emergency Contact in India *" />
                <input
                  type="text"
                  name="emergencyContactInIndia"
                  value={user.emergencyContactInIndia}
                  onChange={handleInputChange}
                  placeholder="Emergency Contact in India"
                  className={`border ${
                    validationErrors.emergencyContactInIndia
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2 w-full`}
                />
                {validationErrors.emergencyContactInIndia && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.emergencyContactInIndia}
                  </p>
                )}
              </div> */}

                {/* <div className="mb-2">
                <Lable label="Address in India *" />
                <input
                  type="text"
                  name="addressInIndia"
                  value={user.addressInIndia}
                  onChange={handleInputChange}
                  placeholder="Address in India"
                  className={`border ${
                    validationErrors.addressInIndia
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2 w-full`}
                />
                {validationErrors.addressInIndia && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.addressInIndia}
                  </p>
                )}
              </div> */}

                {/* <div className="mb-2">
                <Lable label="State *" />
                <input
                  type="text"
                  name="statesInIndia"
                  value={user.statesInIndia}
                  onChange={handleInputChange}
                  placeholder="State"
                  className={`border ${
                    validationErrors.statesInIndia
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded px-3 py-2 w-full`}
                />
                {validationErrors.statesInIndia && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.statesInIndia}
                  </p>
                )}
              </div> */}

                <div className="mb-2">
                  <Lable label="New Password (optional)" />
                  <input
                    type="password"
                    name="password"
                    value={user.password || ""}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className={`border ${
                      validationErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                <div className="mb-2">
                  <Lable label="Confirm Password" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword || ""}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className={`border ${
                      validationErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded px-3 py-2 w-full`}
                  />
                  {validationErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </>
            ) : (
              <div>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">
                        Full Name
                      </th>
                      <td className="py-2 px-4 border-b">
                        <span className="capitalize">{user.title}</span>{" "}
                        {user.firstname} {user.lastname}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">
                        Studio Name / Photography Name
                      </th>
                      <td className="py-2 px-4 border-b">{user.studio_name}</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">
                        Date of Birth
                      </th>
                      <td className="py-2 px-4 border-b">
                        {new Date(user.dob).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">Location</th>
                      <td className="py-2 px-4 border-b">{user.location}</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">Address</th>
                      <td className="py-2 px-4 border-b">{user.address}</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">WhatsApp</th>
                      <td className="py-2 px-4 border-b">{user.whatsappId}</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 px-4 border-b">Email</th>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Family Members
        </h2> */}
          {/* {user.familyMembers.length > 0 ? (
          user.familyMembers.map((member, index) => (
            <FamilyMemberForm
              key={index}
              member={member}
              index={index}
              isEditing={isEditing}
              onChange={handleFamilyMemberChange}
              onImageUpload={handleFamilyMemberImageUpload}
              onRemove={removeFamilyMember}
              previewImages={familyMemberPreviews}
              errors={familyMemberErrors[index]}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No family members added yet.</p>
        )}
        {isEditing && (
          <button
            onClick={addFamilyMember}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Family Member
          </button>
        )} */}
        </div>
        {isEditing && (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="mr-2" />
                Save Changes
              </span>
            )}
          </button>
        )}
        {apiError && <p className="text-red-500 mt-4">{apiError}</p>}

        {/* Display validation errors summary when attempting to submit */}
        {isEditing &&
          (Object.keys(validationErrors).length > 0 ||
            Object.keys(familyMemberErrors).length > 0) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="font-semibold text-red-600">
                Please fix the following errors:
              </p>
              <ul className="list-disc pl-5 mt-2">
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field} className="text-red-600 text-sm">
                    {error}
                  </li>
                ))}
                {/* {Object.entries(familyMemberErrors).map(([index, errors]) =>
                Object.entries(errors).map(([field, error]) => (
                  <li
                    key={`family-${index}-${field}`}
                    className="text-red-600 text-sm"
                  >
                    <>
                      Family Member {parseInt(index) + 1}: {error}
                    </>
                  </li>
                ))
              )} */}
              </ul>
            </div>
          )}
      </div>
    </main>
  );
}

export default Profile;
