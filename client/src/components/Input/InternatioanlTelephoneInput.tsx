import { ChangeEvent, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface InternationalTelephoneInputProps {
  country?: string;
  value: string;
  handleInputChange?: (value: string) => void; // Simplified to only pass the value
}

function InternationalTelephoneInput({
  country,
  value,
  handleInputChange,
}: InternationalTelephoneInputProps) {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [valid, setValid] = useState<boolean | undefined>(true);

  const handleChange = (
    value: string,
    data: {} | CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    const formattedValueWithPlus = `+${value.replace(/\s+/g, "")}`; // Remove spaces and add '+' prefix
    console.log(formattedValueWithPlus); // Debugging: Log the formatted phone number
    setPhoneNumber(formattedValueWithPlus);
    setValid(validatePhoneNumber(formattedValueWithPlus));

    if (handleInputChange) {
      handleInputChange(formattedValueWithPlus); // Pass only the formatted value
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    try {
      const phone = parsePhoneNumberFromString(phoneNumber);
      console.log(phone?.country); // Debugging: Log the parsed phone number
      return (
        phone &&
        phone.isValid() &&
        (phone.country === "NG" ||
          phone.country === "IN" ||
          phone.country === "US" ||
          phone.country === "CA" ||
          phone.country === "PK" ||
          phone.country === "GB") &&
        !/^0/.test(phone.nationalNumber)
      ); // Ensure it's a valid Nigerian or Indian number and doesn't start with 0
    } catch (error) {
      console.error("Error parsing phone number:", error); // Debugging: Log any parsing errors
      return false;
    }
  };

  return (
    <div>
      <PhoneInput
        country={country ? country : "ng"}
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(
          value: string,
          data: {} | CountryData,
          event: ChangeEvent<HTMLInputElement>,
          formattedValue: string
        ) => handleChange(value, data, event, formattedValue)}
        inputProps={{ required: true }}
        enableSearch={true}
        searchStyle={{ width: "100%" }}
        inputStyle={{
          width: "100%",
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius: 8,
          height: 48,
          backgroundColor: "#F4F6F7",
        }}
      />
      {!valid && <span>Please enter a valid phone number</span>}
    </div>
  );
}

export default InternationalTelephoneInput;
