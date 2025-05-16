import { useState } from "react";
import MemberDashboardSideBar from "../MemberDashboardSideBar/MemberDashboardSideBar";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showMorePopUp, setShowMorePopUp] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const togglePopUp = () => {
    setShowMorePopUp(!showMorePopUp);
  };

  return (
    <div className=" flex w-full h-[auto] min-h-screen">
      {/* {showSideBar && (
        <MemberDashboardSideBar handleToggleSideBar={toggleSideBar} />
      )} */}
      <div
        className={`h-screen border-r-2 border-r-[#C4DCF3]  ${
          showSideBar ? "block" : "hidden"
        }  md:block  overflow-x-hidden md:${
          showSideBar ? "w-[296px]" : "w-0"
        } bg-[#1A4F83] `}
      >
        {showSideBar && (
          <MemberDashboardSideBar handleToggleSideBar={toggleSideBar} />
        )}
      </div>
      <main className=" bg-[#F5F7FA] max-h-screen overflow-y-scroll w-full">
        <TopNavBar
          handleToggleSideBar={toggleSideBar}
          handlePopUp={togglePopUp}
          showMorePopUp={showMorePopUp}
        />

        <section
          className=" px-8 pb-16"
          onClick={() => setShowMorePopUp(false)}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
