import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your form data
interface FormData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

// Define the context type
interface FormContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

// Default form data (empty strings initially)
const defaultFormData: FormData = {
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
};

// Create the context with an initial value of the default form data
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider component to wrap the app and provide the form data context
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // Function to update the form data
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to access form context
export const useForm = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
};
