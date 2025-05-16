import { BellRing, ChevronDown, PanelLeftClose } from "lucide-react";

import { Link } from "react-router-dom";
import Avatar from "../../components/Admin-Components/Avatar/Avatar";

type TopNavBarProp = {
  handleToggleSideBar: () => void;
  handlePopUp?: () => void;
  showMorePopUp?: boolean;
};
function AdminTopNavBar({
  handleToggleSideBar,
  handlePopUp,
  showMorePopUp,
}: TopNavBarProp) {
  return (
    <nav className=" bg-[#F5F7FA] flex items-center justify-between px-8 h-[114px]  w-full ">
      <div className="flex items-center gap-8">
        <div>
          <PanelLeftClose
            onClick={handleToggleSideBar}
            className=" cursor-pointer"
            size={24}
          />
        </div>
        <span className="hidden md:inline-block capitalize"></span>
      </div>
      <div className="flex items-center gap-6 cursor-pointer">
        <Link to="/secure/announcement" className="flex items-center gap-1">
          <BellRing className=" cursor-pointer" size={24} />
          <span className=" hidden md:inline-block">Announcement</span>
        </Link>

        {/* avatraer */}
        <div className="flex items-center gap-1">
          <Avatar
            className="w-12 h-12"
            handlShowPopup={handlePopUp}
            showMorePopUp={showMorePopUp}
          />
          <ChevronDown
            size={14}
            onClick={handlePopUp}
            className=" cursor-pointer"
            color="#537BA2"
          />
        </div>
      </div>
      {/* {showMorePopUp && (
        <div className=" absolute right-10 top-24">
          <Popup />
        </div>
      )} */}
    </nav>
  );
}

export default AdminTopNavBar;
