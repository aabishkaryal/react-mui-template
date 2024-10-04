import { memo, useMemo } from "react";
import DrawerHeader from "@components/drawerHeader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { OPEN_DRAWER_WIDTH } from "@utils/constants";
import { closedMixin, openedMixin } from "@utils/drawerMixins";
import { Link as RouterLink } from "react-router-dom"; 

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: OPEN_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

type SidebarOption = {
  name: string;
  icon: JSX.Element;
  path: string;
}

const upperSidebarOptions: SidebarOption[] = [
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

const lowerSidebarOptions: SidebarOption[] = [
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

type SidebarItemProps = {
  option: SidebarOption;
  open: boolean;
};

const SidebarItem = memo(({ option, open }: SidebarItemProps) => (
  <Link
    component={RouterLink}
    to={option.path}
    key={option.name}
    sx={{ textDecoration: "none" }}
    color="#fff"
  >
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            mr: open ? 3 : "auto",
          }}
        >
          {option.icon}
        </ListItemIcon>
        <ListItemText
          primary={option.name}
          sx={{
            opacity: open ? 1 : 0,
          }}
        />
      </ListItemButton>
    </ListItem>
  </Link>
));

SidebarItem.displayName = "SidebarItem";

type SidebarProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const Sidebar = memo(({ open, handleDrawerClose }: SidebarProps) => {
  const upperItems = useMemo(() => 
    upperSidebarOptions.map(option => 
      <SidebarItem key={option.name} option={option} open={open} />
    ), [open]
  );

  const lowerItems = useMemo(() => 
    lowerSidebarOptions.map(option => 
      <SidebarItem key={option.name} option={option} open={open} />
    ), [open]
  );

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider id="top-divider" />
      <Stack
        direction="column"
        spacing={2}
        justifyContent="space-between"
        flex={1}
      >
        <List>{upperItems}</List>
        <List>{lowerItems}</List>
      </Stack>
    </Drawer>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
