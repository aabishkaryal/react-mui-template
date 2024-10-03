import { Box, Button, CircularProgress } from "@mui/material";
import { green } from "@mui/material/colors";
import { Prettify } from "@utils/prettify";
import { ComponentProps } from "react";

type LoadingButtonProps = Prettify<
  ComponentProps<typeof Button> & {
    loading: boolean;
    progressColor?: string;
    progressSize?: number;
  }
>;

export default function LoadingButton({
  children,
  loading,
  progressColor = green[500],
  progressSize = 24,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", width: "100%" }}>
      <Button {...props} disabled={disabled || loading}>
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={progressSize}
          sx={{
            color: progressColor,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: `-${progressSize / 2}px`,
            marginLeft: `-${progressSize / 2}px`,
          }}
        />
      )}
    </Box>
  );
}
