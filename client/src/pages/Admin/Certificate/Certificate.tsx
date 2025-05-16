import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import Button from "../../../components/Button/Button";
import certbg from "../../../assets/certbg.png";
import { useCurrentUser } from "../../../context/AdminContext";

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (certificateRef.current) {
      certificateRef.current.style.backgroundImage = `url(${certbg})`;
      certificateRef.current.style.backgroundSize = "cover";
      certificateRef.current.style.backgroundRepeat = "no-repeat";
    }
  }, []);

  const handleDownload = () => {
    const element = certificateRef.current;
    if (element) {
      const opt = {
        margin: 0,
        filename: `${currentUser?.user?.firstname}${currentUser?.user?.lastname}Certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      };
      html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div>
      <header className="mb-8">
        <Button
          text="Download Certificate"
          className="px-3"
          handleClick={handleDownload}
        />
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
        <div
          ref={certificateRef}
          className="p-10 w-[11.69in] h-[8.27in] flex flex-col items-center justify-center relative"
          style={{ backgroundColor: "white", opacity: 0.9 }}
        >
          <div className="absolute inset-10 text-gray-800">
            <div className="text-center mb-8">
              <h1 className="text-8xl font-serif italic  mt-2">Certificate</h1>
              <p className="text-4xl font-light tracking-wide mt-8">
                OF COMPLETION
              </p>
            </div>
            <div className="text-center mt-6 mb-8">
              <p className="text-2xl font-light">proudly presented to</p>
              <h2 className="text-4xl font-serif italic mt-4">
                Anthony Otumba
              </h2>
            </div>
            <div className="text-center mb-8">
              <p className="text-lg font-light mt-2">
                for completing the online real estate course
              </p>
            </div>

            <div className="flex justify-center items-center space-x-24 mt-28">
              {/* signatories */}
              <div className="text-center">
                <hr className="border border-zinc-500"></hr>
                <div className="px-10">
                  <p className="text-lg font-light ">OLIVIA WILSON</p>
                  <p className="text-sm font-light">Director</p>
                </div>
              </div>
              <div className="relative border-4 border-gray-300 h-[200px] w-[200px] rounded-full p-4 bg-white shadow-lg overflow-hidden">
                <svg
                  viewBox="0 0 240 240"
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <path
                    id="curve"
                    fill="transparent"
                    d="M 20, 120 a 100, 100 0 1, 1 200,0 a 100, 100 0 1, 1 -200,0"
                  />
                  <text
                    width="240"
                    className="text-2xl font-light text-gray-700"
                  >
                    <textPath
                      href="#curve"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      Lagos State Professional Photographers Association Nigeria
                    </textPath>
                  </text>
                </svg>
                <div className="flex items-center justify-center h-full">
                  <strong className="text-black text-3xl font-bold">
                    LASSPAN
                  </strong>
                </div>
              </div>
              {/* signatories */}
              <div className="text-center">
                <hr className="border border-zinc-500"></hr>
                <div className="px-10">
                  <p className="text-lg font-light">ISABEL MERCADO</p>
                  <p className="text-sm font-light">Manager</p>
                </div>
              </div>
            </div>
            <p>ID NO: {currentUser?.user._id}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Certificate;
