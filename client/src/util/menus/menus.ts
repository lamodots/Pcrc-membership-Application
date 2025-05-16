import { icons } from "lucide-react";
type IconName = keyof typeof icons;

interface userRoutes {
  key: string;
  label: string;
  path: string;
  menuIcon: IconName;
}
interface adminRoutes {
  key: string;
  label: string;
  path: string;
  menuIcon: IconName;
}
export const userDashboardMenus: userRoutes[] = [
  {
    key: "overview",
    label: "Overview",
    path: "/",
    menuIcon: "LayoutDashboard",
  },
  // {
  //   key: "content",
  //   label: "Content",
  //   path: "content",
  //   menuIcon: "Book",
  // },
  // {
  //   key: "members",
  //   label: "Members",
  //   path: "members",
  //   menuIcon: "UsersRound",
  // },
  {
    key: "subscription",
    label: "Subscription",
    path: "subscription",
    menuIcon: "HandCoins",
  },
  {
    key: "events",
    label: "Events",
    path: "events",
    menuIcon: "Video",
  },
  // {
  //   key: "certificate",
  //   label: "Certificate",
  //   path: "certificate",
  //   menuIcon: "GraduationCap",
  // },
  {
    key: "idcard",
    label: "ID Card",
    path: "id_card",
    menuIcon: "IdCard",
  },
  {
    key: "donate",
    label: "Donate",
    path: "donate",
    menuIcon: "HandHeart",
  },
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "settings",
  //   menuIcon: "Settings",
  // },
];
export const adminDashboardMenus: adminRoutes[] = [
  {
    key: "overview",
    label: "Overview",
    path: "/secure",
    menuIcon: "LayoutDashboard",
  },
  // {
  //   key: "content",
  //   label: "Content",
  //   path: "content",
  //   menuIcon: "Book",
  // },
  {
    key: "members",
    label: "Members",
    path: "members",
    menuIcon: "UsersRound",
  },
  {
    key: "payments",
    label: "Payments",
    path: "payments",
    menuIcon: "HandCoins",
  },
  {
    key: "announcement",
    label: "Announcement",
    path: "announcement",
    menuIcon: "Bell",
  },
  {
    key: "events",
    label: "Events",
    path: "events",
    menuIcon: "Video",
  },
  {
    key: "advertisment",
    label: "Advertisment",
    path: "advertisment",
    menuIcon: "Megaphone",
  },
  // {
  //   key: "certificate",
  //   label: "Certificate",
  //   path: "certificate",
  //   menuIcon: "GraduationCap",
  // },
  // {
  //   key: "idcard",
  //   label: "ID Card",
  //   path: "id_card",
  //   menuIcon: "IdCard",
  // },
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    menuIcon: "Settings",
  },
];
