import useUserStore from "@/stores/userStore";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const resetUser = useUserStore((store) => store.reset);
  useEffect(() => {
    resetUser();
    navigate("/login");
  }, []);
  return <Skeleton variant="rectangular" height={400} />;
}
