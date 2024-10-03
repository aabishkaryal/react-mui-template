import DarkLogo from "@assets/logo-dark.svg";
import LightLogo from "@assets/logo-light.svg";
import { Stack, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export default function Logo() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const logo = useMemo(() => prefersDarkMode ? DarkLogo : LightLogo, [prefersDarkMode]);

  return (
    <Stack width="100%" alignItems="center">
      <img src={logo} alt="logo" height={70} width={174} />
    </Stack>
  );
}
