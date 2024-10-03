import { Stack } from "@mui/material";

type CenterProps = {
  children: React.ReactNode;
};

export default function Center({ children }: CenterProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      {children}
    </Stack>
  );
}
