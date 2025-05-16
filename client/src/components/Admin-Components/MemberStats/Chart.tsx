import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);

type ChatData = { male: number | undefined; female: number | undefined };
function Chart({ male, female }: ChatData) {
  const data = {
    datasets: [
      {
        backgroundColor: ["rgb(255,174,128)", "purple"],

        data: [male, female],
        weight: 20,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Male", "Female"],
  };

  const options = { radius: "80%" };

  return (
    <div>
      <h3 className="text-xs uppercase text-center text-[#1A4F83] font-bold">
        MEMBER DEMOGRAPHY
      </h3>
      <p className="text-xs  text-center text-[#1A4F83] mt-2 ">
        The stats of members who completed onboarding.
      </p>
      <div className="flex justify-center mt-10 w-full">
        {/* <img src={chart} /> */}
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}

export default Chart;
