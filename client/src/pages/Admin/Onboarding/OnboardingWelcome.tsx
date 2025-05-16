import Button from "../../../components/Button/Button";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepTwo from "./OnboardingStepTwo";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingHeader from "../../../layouts/OnboardingHeader/OnboardingHeader";

function OnboardingWelcome() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryStep = new URLSearchParams(location.search).get("step");
  const currentStep = queryStep || "1";

  // fucntion to go to next step
  const handleNextStep = () => {
    const nextStep = parseInt(currentStep) + 1;
    // if (parseInt(currentStep) >= 2) {
    //   return;
    // }
    navigate(`/member-onboarding?step=${nextStep}`);
  };

  // function to go to previous step
  const handlePrevStep = () => {
    const prevStep = parseInt(currentStep) - 1;
    if (prevStep >= 1) {
      navigate(`/member-onboarding?step=${prevStep}`);
    }
  };

  // Render corresponding component that matches the step
  let stepComponent;
  switch (currentStep) {
    case "1":
      stepComponent = <OnboardingStepOne />;
      break;
    case "2":
      stepComponent = <OnboardingStepTwo />;
      break;
    // case '3':
    //   stepComponent = <OnboardingStepThree />;
    //   break;
    default:
      stepComponent = <div>Invalid Step</div>;
      break;
  }
  return (
    <div className=" bg-[#F5F7FA]">
      <OnboardingHeader title=" Start Onboarding" />
      <main className=" py-[96px]">
        <h1 className="text-2xl text-center text-[#212529]">
          Welcome Lagos State Professional Photography Association Of Nigeria
        </h1>

        <div className="flex justify-center pt-8">
          <div>
            <p className="mb-8 text-lg text-[#515F69]">Setup your profile</p>
            <Button
              text="Continue"
              className="w-full"
              handleClick={handlePrevStep}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default OnboardingWelcome;
