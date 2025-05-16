import * as Yup from "yup";

// Step 1: Personal Information
export const stepOneSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title is required"),
  dateOfEntry: Yup.date().required("Date of entry is required"),
});

// Step 2: Family Members Information
export const familyMemberSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  title: Yup.string().required("Title is required"),
  dateOfEntry: Yup.date().required("Date of entry is required"),
  emailId: Yup.string().email("Invalid email").required("Email is required"),
  whatsappId: Yup.string().required("WhatsApp number is required"),
  relationship: Yup.string().required("Relationship is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
});

// Step 3: Emergency Contact and Address in India
export const stepThreeSchema = Yup.object().shape({
  emergencyContactInIndia: Yup.string().required(
    "Emergency contact is required"
  ),
  districtInIndia: Yup.string().required("District is required"),
  addressInIndia: Yup.string().required("Address is required"),
});
