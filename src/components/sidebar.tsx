import DrawerHeader from "@/components/drawerHeader";
import { SidebarOption } from "@/types/sidebarOption";
import { OPEN_DRAWER_WIDTH } from "@/utils/constants";
import { closedMixin, openedMixin } from "@/utils/drawerMixins";
import {
  LOWER_SIDEBAR_OPTIONS,
  UPPER_SIDEBAR_OPTIONS,
} from "@/utils/sidebarOption";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
import { memo, useMemo } from "react";
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

export default function Sidebar({ open, handleDrawerClose }: SidebarProps) {
  const upperItems = useMemo(
    () =>
      UPPER_SIDEBAR_OPTIONS.map((option) => (
        <SidebarItem key={option.name} option={option} open={open} />
      )),
    [open]
  );

  const lowerItems = useMemo(
    () =>
      LOWER_SIDEBAR_OPTIONS.map((option) => (
        <SidebarItem key={option.name} option={option} open={open} />
      )),
    [open]
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
}
