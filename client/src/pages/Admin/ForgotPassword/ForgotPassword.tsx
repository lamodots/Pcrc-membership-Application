import React, { useState } from "react";
import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import LoginAsset from "../../../assets/loginassets.svg";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-2 gap-8 items-center pl-[7rem] h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
          Forgot Password
        </h1>
        <form className="flex flex-col gap-6">
          <div className=" flex flex-col gap-2">
            <Lable label="Email" />
            <TextInput
              type="text"
              placeholderText="Enter your email"
              name="email"
              value={userEmail}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserEmail("hello")
              }
            />
          </div>

          <Button text="Request Link" />
        </form>
        {/* I will remove the para later */}
        <p className="text-center text-sm mt-6">
          <Link to="/reset-password" className="text-[#1A4F83]">
            Reset password
          </Link>
        </p>
      </div>

      <div className="loginFormIllutration w-[614px] h-screen">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div>
    </main>
  );
}

export default ForgotPassword;
