import AppLayout from "@components/appLayout";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Home from "@pages/home";
import Login from "@pages/login";
import Logout from "@pages/logout";
import NotFound from "@pages/not-found";
import Register from "@pages/register";
import darkTheme from "@utils/dark-theme";
import lightTheme from "@utils/light-theme";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
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
