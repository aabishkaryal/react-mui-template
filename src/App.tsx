import AppLayout from "@/components/appLayout";
import darkTheme from "@/utils/dark-theme";
import lightTheme from "@/utils/light-theme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Logout = lazy(() => import("@/pages/logout"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Register = lazy(() => import("@/pages/register"));

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
