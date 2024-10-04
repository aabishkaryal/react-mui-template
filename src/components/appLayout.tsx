import { verifyTokenApi } from "@api/auth";
import AppBar from "@components/appbar";
import Sidebar from "@components/sidebar";
import { Box, BoxProps, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import useUserStore from "@stores/userStore";
import { APP_BAR_HEIGHT, CLOSED_DRAWER_WIDTH, OPEN_DRAWER_WIDTH } from "@utils/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface OutletBoxProps extends BoxProps {
  open?: boolean;
}

const OutletBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<OutletBoxProps>(({ theme }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: CLOSED_DRAWER_WIDTH,
  marginTop: APP_BAR_HEIGHT,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: OPEN_DRAWER_WIDTH,
        width: `calc(100% - ${OPEN_DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = useUserStore(store => store.token);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prevOpen => !prevOpen);
  }, []);

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !validated) {
      verifyTokenApi({token}).then(() => {
        setValidated(true);
      }).catch(() => {
        navigate("/login");
      });
    } else if (!token) {
      navigate("/login");
    }
  }, [token, validated, navigate]);


  const appBar = useMemo(() => (
    <AppBar open={drawerOpen} handleDrawerOpen={handleDrawerToggle} />
  ), [drawerOpen, handleDrawerToggle]);

  const sidebar = useMemo(() => (
    <Sidebar open={drawerOpen} handleDrawerClose={handleDrawerToggle} />
  ), [drawerOpen, handleDrawerToggle]);

  if (!validated) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  return (
    <Stack>
      {appBar}
      {sidebar}
      <OutletBox open={drawerOpen}>
        <Outlet />
      </OutletBox>
    </Stack>
  );
}
