import OnboardingHeader from "../../../layouts/OnboardingHeader/OnboardingHeader";
import Lable from "../../../components/Lable/Lable";
import TextInput from "../../../components/Input/TextInput";
import Button from "../../../components/Button/Button";

function OnboardingStepTwo() {
  return (
    <div className=" bg-[#F5F7FA]">
      <OnboardingHeader title="About You And Intrest" />
      <main className="px-4 py-[96px] md:px-[135px]">
        <h1 className="text-2xl  text-[#212529]">
          Lets get to you and your journey
        </h1>

        <div className=" mt-8 max-w-[580px] w-full">
          <form>
            <div>
              <h3 className="text-xl text-[#212529] font-bold">About you</h3>
              <div className="flex  flex-col gap-2 mt-8">
                <Lable label="Tell us about yourself" className=" text-xs" />
                <textarea
                  placeholder="Write text"
                  className="bg-[#F4F6F7] border border-[#A6B4BA] rounded-lg p-4 h-[102px]"
                />
                <span className=" flex justify-end text-sm text-[#212529]">
                  0/400
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Lable label="Add your social link" />
                <TextInput
                  type="text"
                  name=""
                  value=""
                  placeholderText="EG. https://www.google.com/me"
                  handleInputChange={() => console.log("console")}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl text-[#212529] font-bold mb-8 ">
                Set your interest
              </h3>
              <div>
                <p className="mb-6">Select your photography interests</p>
                <div className=" grid grid-cols-2 gap-4">
                  <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                    <TextInput
                      id="People_Photography"
                      type="checkbox"
                      name=""
                      value=""
                      handleInputChange={() => console.log("herllo")}
                      className="w-6 h-14"
                    />
                    <Lable
                      label="People Photography"
                      htmlFor="People_Photography"
                    />
                  </div>
                  <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                    <TextInput
                      type="checkbox"
                      name=""
                      value=""
                      handleInputChange={() => console.log("herllo")}
                      className="w-6 h-14"
                    />
                    <Lable label="Manmade Objects" />
                  </div>
                  <div className=" w-full flex items-center gap-2 bg-[#F4F6F7] border border-[#A6B4BA] px-3 py-2 rounded-lg">
                    <TextInput
                      type="checkbox"
                      name=""
                      value=""
                      handleInputChange={() => console.log("herllo")}
                      className="w-6 h-14"
                    />
                    <Lable label="Nature Photography" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                text="Complete and continue to Dashboard"
                className="w-full"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default OnboardingStepTwo;
