import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Home from "@pages/home";
import Login from "@pages/login";
import NotFound from "@pages/not-found";
import Register from "@pages/register";
import lightTheme from "@utils/light-theme";
import darkTheme from "@utils/dark-theme";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
