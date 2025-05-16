import Avatar from "../../Avatar/Avatar";

function NewMemberCard({
  name,
  image,
  date,
  email,
}: {
  name: string;
  image: string;
  date?: string;
  email?: string;
}) {
  return (
    <div className=" bg-white rounded-lg flex gap-3 items-center p-6">
      <div>
        <Avatar className="w-12 h-12 " image={image} />
      </div>
      <div>
        <h3 className="text-[#1A4F83] capitalize font-bold">{name}</h3>
        {date && <small className="text-[#A6B4BA]">{date}</small>}
        {email && <small className="text-[#A6B4BA]">{email}</small>}
      </div>
    </div>
  );
}

export default NewMemberCard;
