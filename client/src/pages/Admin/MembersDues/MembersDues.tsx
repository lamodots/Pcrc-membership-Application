import { HandCoins, HeartHandshake } from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";

function MembersDues() {
  return (
    <div>
      <header className="md:space-x-8  md:flex md:items-center border-b py-6">
        {/* <NavLink to="/secure/members-dues">All Transactions</NavLink> */}
        <NavLink
          to="/secure/payments/membership-payments"
          className={({ isActive }) =>
            [
              isActive
                ? " flex font-semibold text-sm bg-[#559FDB] px-2 py-2 rounded text-white"
                : "flex space-x-2 items-center font-semibold text-sm px-2 py-2 rounded",
            ].join("")
          }
        >
          <HeartHandshake /> <span>Membership pay</span>
        </NavLink>
        <NavLink
          to="/secure/payments/welfare-payments"
          className={({ isActive }) =>
            [
              isActive
                ? " flex font-semibold space-x-2 text-sm bg-[#559FDB] px-2 py-2 rounded text-white"
                : "flex space-x-2 items-center font-semibold text-sm px-2 py-2 rounded",
            ].join("")
          }
        >
          <HandCoins /> <span>Welfare pay</span>
        </NavLink>
      </header>
      <main className="py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default MembersDues;
