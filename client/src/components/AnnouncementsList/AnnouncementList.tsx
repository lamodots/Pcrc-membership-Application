import { dateFormater } from "../../util/DateFormater";

function AnnouncementList({
  description,
  title,
  time,
  venue,
  photoImage,
  createdBy,
  createdAt,
}: {
  description?: string;
  title: string;
  photoImage?: string;
  venue?: string;
  time?: string;
  createdAt?: string;
  createdBy?: {
    firstname: string;
    lastname: string;
  };
}) {
  const textToShow = 172;

  console.log("WAWWW!!", createdAt);
  return (
    <div
      className={`w-full ${
        photoImage && "h-[350px]"
      } bg-white rounded-lg flex flex-col p-3`}
    >
      {photoImage && (
        <img
          src={`${photoImage}`}
          alt={title}
          className="h-48 w-full object-cover rounded-lg mb-2"
        />
      )}
      <h3 className="font-semibold text-base w-full capitalize mb-1">
        {title}
      </h3>
      <small className="text-gray-500">{dateFormater(createdAt)}</small>
      {/* <p className="text-gray-600 text-sm mb-2">{venue}</p> */}
      {description && (
        <p
          className={`text-sm text-gray-700 ${
            photoImage ? `flex-grow` : ""
          } overflow-hidden`}
        >
          {description.length > textToShow
            ? `${description.slice(0, textToShow)} ...`
            : description}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-auto capitalize">
        Created By: {createdBy?.firstname + " " + createdBy?.lastname}
      </p>
    </div>
  );
}

export default AnnouncementList;
