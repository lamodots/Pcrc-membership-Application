import ksnImage from "../../assets/ksn.jpg";
function OnboardingHeader({ title }: { title: string }) {
  return (
    <header
      className="h-[325px] overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: `url(${ksnImage})` }}
    >
      <span className=" bg-[#1A4F83] text-2xl text-[#F4F6F7] px-14 py-3">
        {title}
      </span>
    </header>
  );
}

export default OnboardingHeader;
