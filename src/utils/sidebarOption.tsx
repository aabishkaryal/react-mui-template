import { SidebarOption } from "@/types/sidebarOption";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import TuneIcon from "@mui/icons-material/Tune";

export const UPPER_SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    name: "Users",
    icon: <PeopleIcon />,
    path: "/users",
  },
];

export const LOWER_SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    name: "Settings",
    icon: <TuneIcon />,
    path: "/settings",
  },
  {
    name: "Logout",
    icon: <LogoutIcon />,
    path: "/logout",
  },
];
