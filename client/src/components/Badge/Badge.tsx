/**
 * A Badge component that displays a member type.
 * @params memberType: string
 *
 */
function Badge({ memberType }: { memberType?: string }) {
  return (
    <div className="px-3 py-2 rounded-lg w-fit  bg-gradient-to-l from-[#5BD3CF] to-[#FFAE80] text-sm font-bold">
      {!memberType && "Normal"}
    </div>
  );
}

export default Badge;
