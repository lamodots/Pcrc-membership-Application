import { CircleUser, LogOut } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../context/AdminContext";

type PopupProp = {
  className?: string;
  handlShowPopup?: () => void;
  handleLogout?: () => void;
};

function Popup({ className, handlShowPopup }: PopupProp) {
  const { handleLogout } = useCurrentUser();

  const navigate = useNavigate();

  const handleClick = async () => {
    await handleLogout();
    // navigate("/secure/login");
  };

  return (
    <div className="px-4 py-6 rounded-lg flex flex-col gap-6 bg-[#FFFFFF] shadow-lg">
      <div
        className="flex items-center gap-1 cursor-pointer hover:text-[#5BD3CF]"
        onClick={handlShowPopup}
      >
        <LogOut size={24} />
        <span onClick={handleClick}>Logout</span>
      </div>

      <div
        className="flex items-center gap-1 cursor-pointer hover:text-[#5BD3CF] "
        onClick={handlShowPopup}
      >
        <CircleUser size={24} />
        <Link to="/secure/settings">Settings</Link>
      </div>
    </div>
  );
}

export default Popup;
