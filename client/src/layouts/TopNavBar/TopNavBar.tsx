import { BellRing, ChevronDown, PanelLeftClose } from "lucide-react";

import Avatar from "../../components/Avatar/Avatar";

import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/AdminContext";

type TopNavBarProp = {
  handleToggleSideBar: () => void;
  handlePopUp?: () => void;
  showMorePopUp?: boolean;
};
function TopNavBar({
  handleToggleSideBar,
  handlePopUp,
  showMorePopUp,
}: TopNavBarProp) {
  const { currentUser } = useCurrentUser();
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
        <span className="hidden md:inline-block capitalize">
          {/* Hello {profile?.user?.firstname}, Welcome ! */}
        </span>
      </div>
      <div className="flex items-center gap-6 cursor-pointer">
        <Link to="/announcement" className="flex items-center gap-1">
          <BellRing className=" cursor-pointer" size={24} />
          <span className=" hidden md:inline-block">Announcement</span>
        </Link>

        {/* avatraer */}
        <div className="flex items-center gap-1">
          <Avatar
            className="w-12 h-12"
            handlShowPopup={handlePopUp}
            showMorePopUp={showMorePopUp}
            image={currentUser?.user.image}
          />
          <ChevronDown
            size={14}
            onClick={handlePopUp}
            className=" cursor-pointer"
            color="#537BA2"
          />
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;
