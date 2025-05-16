import React, { useState } from "react";

import TextInput from "../../../components/Input/TextInput";
import Lable from "../../../components/Lable/Lable";
import LoginAsset from "../../assets/loginassets.svg";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPsssword, setUserConfirmPassword] = useState("");
  return (
    <main className=" bg-[#F4F6F7] w-screen grid grid-cols-2 gap-8 items-center pl-[7rem] h-screen overflow-hidden">
      <div className="userform">
        <h1 className=" text-2xl text-[#212529] text-center font-bold">
          Reset A New Password
        </h1>
        <form className="flex flex-col gap-6">
          <div className="password flex flex-col gap-2">
            <Lable label="Password" />
            <TextInput
              type="password"
              placeholderText="Enter new password"
              name="email"
              value={userPassword}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserPassword("hello")
              }
            />
          </div>
          <div className="password flex flex-col gap-2">
            <Lable label="Confirm Password" />
            <TextInput
              type="password"
              placeholderText="Confirm new password"
              name="ConfirmPass"
              value={userConfirmPsssword}
              handleInputChange={(event: React.FormEvent<HTMLInputElement>) =>
                setUserConfirmPassword("hello")
              }
            />
          </div>

          <Button text="Reset" />
        </form>

        <p className=" text-center text-base mt-8">
          <Link to="/" className="text-base text-[#1A4F83]">
            Back to Login
          </Link>
        </p>
      </div>

      <div className="loginFormIllutration w-[614px] h-screen">
        <img src={LoginAsset} className="w-[614px] h-full" />
      </div>
    </main>
  );
}

export default ResetPassword;
