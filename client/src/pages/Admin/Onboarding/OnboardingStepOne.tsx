import Button from "../../../components/Button/Button";
import { CircleUserRound, SquarePen } from "lucide-react";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import OnboardingHeader from "../../../layouts/OnboardingHeader/OnboardingHeader";

function OnboardingStepOne() {
  return (
    <div className=" bg-[#F5F7FA]">
      <OnboardingHeader title="Showcase Your Style" />
      <main className=" py-[96px] px-[135px]">
        <h1 className="text-2xl  text-[#212529]">
          Add a profile photo and a few details to help others get to know you
          better.
        </h1>

        <div className=" max-w-[580px] w-full mt-[64px]">
          <form>
            <div className=" flex gap-2 items-center ">
              <div>
                <CircleUserRound size={80} strokeWidth={1} />
                <SquarePen
                  size={24}
                  strokeWidth={1}
                  className=" relative top-[-40px] right-[-60px] z-10 cursor-pointer"
                />
              </div>
              <span className=" text-xs text-[#3E454C]">
                Upload profile picture
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <Lable label="First name" />
                <TextInput
                  type="text"
                  placeholderText="Enter firstname"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
              <div>
                <Lable label="Last name" />
                <TextInput
                  type="text"
                  placeholderText="Enter lastname"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
              <div>
                <Lable label="Date of Birth" />
                <TextInput
                  type="date"
                  placeholderText="Enter Date of Birth"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
              <div>
                <Lable label="Phone Number" />
                <TextInput
                  type="text"
                  placeholderText="Enter Phone Number"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
              <div>
                <Lable label="Location" />
                <TextInput
                  type="text"
                  placeholderText="Example Ikeja"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
              <div>
                <Lable label="Address" />
                <TextInput
                  type="text"
                  placeholderText="Enter Address"
                  name=""
                  value=""
                  handleInputChange={(event) => console.log("hello")}
                />
              </div>
            </div>
            <div className="mt-8">
              <Button
                text="Continue to next step"
                handleClick={() => console.log("hello")}
                className="w-full"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default OnboardingStepOne;
