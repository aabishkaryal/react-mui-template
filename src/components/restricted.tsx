import useUserStore from "@/stores/userStore";
import { useMemo } from "react";

type RestrictedProps = {
  to: string | string[];
  children: React.ReactNode;
};

export default function Restricted({ to, children }: RestrictedProps) {
  const privileges = useUserStore((store) => store.privileges);

  const hasAccess = useMemo(() => {
    if (!privileges) return false;
    if (Array.isArray(to)) {
      return to.every((item) => privileges.includes(item));
    }
    return privileges.includes(to);
  }, [privileges, to]);

  if (hasAccess) {
    return <>{children}</>;
  }
  return null;
}
