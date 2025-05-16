import avatar from "../../assets/avatar_default.png";
import Popup from "../Popup/Popup";

type AvatarProps = {
  className?: string;
  image?: string;
  handlShowPopup?: () => void;
  showMorePopUp?: boolean;
};
function Avatar({
  className,
  image,
  handlShowPopup,
  showMorePopUp,
}: AvatarProps) {
  const userImage = !image ? avatar : image;
  console.log(userImage);
  return (
    <>
      <div
        className={`${className} rounded-full relative   cursor-pointer bg-slate-600 `}
        onClick={handlShowPopup}
      >
        <img
          src={userImage}
          alt="User picture"
          className="w-full h-full object-cover rounded-[50%]"
        />
        {showMorePopUp && (
          <div className=" relative  z-50 -top-1 right-24 mt-2 w-[136px]">
            <Popup handlShowPopup={handlShowPopup} />
          </div>
        )}
      </div>
    </>
  );
}

export default Avatar;
