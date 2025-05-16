import { useState } from "react";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { Link, NavLink } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import { adminDashboardMenus } from "../../util/menus/menus";
import { ChevronDown, ChevronUp, SidebarCloseIcon } from "lucide-react";
import useFetchAppData from "../../hooks/useFetchAppData";
import { Oval } from "react-loader-spinner";
type DashboardSideBarProp = {
  handleToggleSideBar: () => void;
};

function AdminDashboardSideBar({ handleToggleSideBar }: DashboardSideBarProp) {
  const [openAnnouncementMenu, setOpenAnnouncementMenu] = useState(false);
  const [openEventMenu, setOpenEventMenu] = useState(false);

  const { appData, loading } = useFetchAppData();

  return (
    <aside className=" fixed overflow-y-auto pb-8  z-50 shadow-lg bg-[#E35C1E] border-r-2 border-r-[#C4DCF3] md:static md:z-0 md:shadow-none   transition ease-in-out delay-150 duration-300 w-[240px]  md:w-[296px] h-full">
      <SidebarCloseIcon
        className="relative left-6 mt-8 md:hidden"
        onClick={handleToggleSideBar}
      />
      <div className="brand py-8 px-6 mb-8  border-b-2 border-b-[#C4DCF3] ">
        <div className="flex items-center gap-3">
          <BrandLogo color="#F5F7FA" />
          {loading ? (
            <Oval height={6} width={6} />
          ) : (
            <span className="text-2xl text-[#F5F7FA] font-bold">
              {appData ? appData?.appname_acronym : "Band"}
            </span>
          )}
        </div>
        <span className="text-[7px]  text-[#F5F7FA] font-bold">
          {appData ? appData?.appname : "Band"}
        </span>
      </div>
      <div className="  px-6 links flex flex-col gap-6 ">
        {adminDashboardMenus.map((menu) => (
          <div className="flex items-center gap-2" key={menu.key}>
            <div>
              <div className="flex items-center gap-3">
                {/* Mobile Links */}
                <NavLink
                  onClick={handleToggleSideBar}
                  to={`${menu.path}`}
                  end={menu.path === "/secure"}
                  key={menu.key}
                  className="cursor-pointer hover:text-[#5BD3CF] md:hidden"
                >
                  {({ isActive }) => (
                    <div className="flex items-center gap-2">
                      <Icon
                        name={menu.menuIcon}
                        size={24}
                        color={isActive ? "#5BD3CF" : "#A5BCD4"}
                      />
                      <span
                        className={`${
                          isActive
                            ? "text-[#F5F7FA] "
                            : "text-[#A5BCD4] font-semibold"
                        } text-lg`}
                      >
                        {menu.label}
                      </span>
                    </div>
                  )}
                </NavLink>
                {/* // Desktop */}
                <NavLink
                  to={`${menu.path}`}
                  end={menu.path === "/secure"}
                  key={menu.key}
                  className="cursor-pointer hover:text-[#5BD3CF] hidden md:block"
                >
                  {({ isActive }) => (
                    <div className="flex items-center gap-2">
                      <Icon
                        name={menu.menuIcon}
                        size={24}
                        color={isActive ? "#5BD3CF" : "#A5BCD4"}
                      />
                      <span
                        className={`${
                          isActive ? "text-[#F5F7FA] " : "text-[#A5BCD4]"
                        } text-lg`}
                      >
                        {menu.label}
                      </span>
                    </div>
                  )}
                </NavLink>
                <div>
                  {/* {menu.path === "members" && (
                    <div>
                      {openMembersMenu ? (
                        <ChevronUp
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() => setOpenMembersMenu(!openMembersMenu)}
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() => setOpenMembersMenu(!openMembersMenu)}
                        />
                      )}
                    </div>
                  )} */}
                  {/* {menu.path === "members-dues" && (
                    <div>
                      {openSubscriptionMenu ? (
                        <ChevronUp
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() =>
                            setOpenSubscriptionMenu(!openSubscriptionMenu)
                          }
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() =>
                            setOpenSubscriptionMenu(!openSubscriptionMenu)
                          }
                        />
                      )}
                    </div>
                  )} */}
                  {menu.path === "announcement" && (
                    <div>
                      {openAnnouncementMenu ? (
                        <ChevronUp
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() =>
                            setOpenAnnouncementMenu(!openAnnouncementMenu)
                          }
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() =>
                            setOpenAnnouncementMenu(!openAnnouncementMenu)
                          }
                        />
                      )}
                    </div>
                  )}
                  {menu.path === "events" && (
                    <div>
                      {openEventMenu ? (
                        <ChevronUp
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() => setOpenEventMenu(!openEventMenu)}
                        />
                      ) : (
                        <ChevronDown
                          size={16}
                          className="text-[#A5BCD4] cursor-pointer transition"
                          onClick={() => setOpenEventMenu(!openEventMenu)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* {menu.path === "members" && (
                <>
                  {openMembersMenu && (
                    <div className=" bg-[#f2f7fd1a] w-full  transition-all p-3 rounded-tl rounded-br rounded-bl">
                      <ul>
                        <li>
                          <Link
                            to="members"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            All
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="members/create"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            Create
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )} */}
              {/* {menu.path === "members-dues" && (
                <>
                  {openSubscriptionMenu && (
                    <div className=" bg-[#f2f7fd1a] w-full  transition-all p-3 rounded-tl rounded-br rounded-bl">
                      <ul>
                        <li>
                          <Link
                            to="members-dues"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            All
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="members-dues/create"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            Welfare Dues
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="members-dues/create"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            Membership Dues
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )} */}
              {menu.path === "announcement" && (
                <>
                  {openAnnouncementMenu && (
                    <div className=" bg-[#f2f7fd1a] w-full  transition-all p-3 rounded-tl rounded-br rounded-bl">
                      <ul>
                        <li>
                          <Link
                            to="announcement"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            All
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="announcement/create"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            Create
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
              {menu.path === "events" && (
                <>
                  {openEventMenu && (
                    <div className=" relative bg-[#f2f7fd1a] w-full  transition-all p-3 rounded-tl rounded-br rounded-bl">
                      <ul className="space-y-6">
                        <li>
                          <Link
                            to="events"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            All
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="events/create"
                            className="text-[#cdcdcdf9] font-normal"
                          >
                            Create
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default AdminDashboardSideBar;
