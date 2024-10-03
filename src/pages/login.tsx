import Center from "@components/center";
import CustomTextField from "@components/customTextField";
import LoadingButton from "@components/loadingButton";
import Logo from "@components/logo";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import useUserStore, { User } from "@stores/userStore";
import { Prettify } from "@utils/prettify";
import loginApi from "@api/auth";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState, KeyboardEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUser = useUserStore((store) => store.updateUser);
  const navigate = useNavigate();

  const login = useCallback((e?: FormEvent) => {
    e?.preventDefault();
    // TODO: check for valid email
    if (email === "" || password === "") {
      setSnackBarMessage("Please enter your email and password");
      setSnackBarOpen(true);
      return;
    }
    setLoading(true);
    loginApi({ email, password })
      .then((token) => {
        const payload = jwtDecode<Prettify<Omit<User, "token">>>(token);
        updateUser({ ...payload, token });
        navigate("/");
      })
      .catch((error) => {
        setSnackBarMessage(error.message);
        setSnackBarOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, navigate, password, updateUser]);

  const handleCloseSnackBar = useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") login();
    },
    [login]
  );

  return (
    <Center>
      <Paper
        elevation={1}
        sx={{
          padding: "32px",
          width: "66%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Logo />
        <Typography variant="subtitle1" textAlign="center" mb={1}>
          Your Social Campaigns
        </Typography>
        <form onSubmit={login}>
          <Stack>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Username
              </Typography>
              <CustomTextField
                type="email"
                variant="outlined"
                autoComplete="username"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
              >
                Password
              </Typography>
              <CustomTextField
                type="password"
                variant="outlined"
                autoComplete="current-password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Box>
            <Stack
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              my={2}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember this Device"
                />
              </FormGroup>
              <Typography
                component={Link}
                href="/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                Forgot Password ?
              </Typography>
            </Stack>
          </Stack>
          <LoadingButton
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            loading={loading}
          >
            Sign In
          </LoadingButton>
        </form>
        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            New to Modernize?
          </Typography>
          <Typography
            component={Link}
            href="/register"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Create an account
          </Typography>
        </Stack>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        message={snackBarMessage}
        key="login-snackbar"
        autoHideDuration={1200}
      />
    </Center>
  );
}
