import { registerApi } from "@api/auth";
import Center from "@components/center";
import CustomTextField from "@components/customTextField";
import LoadingButton from "@components/loadingButton";
import Logo from "@components/logo";
import {
  Box,
  Link,
  Paper,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import useUserStore, { User } from "@stores/userStore";
import { Prettify } from "@utils/prettify";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUser = useUserStore((store) => store.updateUser);
  const navigate = useNavigate();

  const register = useCallback((e?: FormEvent) => {
    e?.preventDefault();
    if (name === "" || email === "" || password === "") {
      setSnackBarMessage("Please enter your name, email and password");
      setSnackBarOpen(true);
      return;
    }
    if (!email.includes("@")) {
      setSnackBarMessage("Please enter a valid email");
      setSnackBarOpen(true);
      return;
    }
    if (password.length < 8) {
      setSnackBarMessage("Password must be at least 8 characters");
      setSnackBarOpen(true);
      return;
    }
    if (name.length < 3) {
      setSnackBarMessage("Name must be at least 3 characters");
      return; 
    }
    setLoading(true);
    registerApi({ name, email, password })
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
  }, [email, name, navigate, password, updateUser]);

  const handleCloseSnackBar = useCallback(() => {
    setSnackBarOpen(false);
  }, []);

  return (
    <Center>
      <Paper
        elevation={1}
        sx={{
          padding: { xs: 2, sm: 3 },
          width: { xs: "80%", sm: "66%" },
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
        }}
      >
        <Logo />
        <Typography variant="subtitle1" textAlign="center" mb={1}>
          Your Social Campaigns
        </Typography>
        <form onSubmit={register}>
          <Stack marginY={{ xs: 2, sm: 3 }} useFlexGap spacing={{ xs: 2, sm: 3 }}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Full Name
              </Typography>
              <CustomTextField
                type="text"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="username"
                mb="5px"
              >
                Email
              </Typography>
              <CustomTextField
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
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
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Stack>
          <LoadingButton
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            loading={loading}
          >
            Register
          </LoadingButton>
        </form>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={{ xs: 2, sm: 3 }}
        >
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Already have an account?
          </Typography>
          <Typography
            component={Link}
            href="/login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Login
          </Typography>
        </Stack>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        message={snackBarMessage}
        key="register-snackbar"
        autoHideDuration={1200}
      />
    </Center>
  );
}
