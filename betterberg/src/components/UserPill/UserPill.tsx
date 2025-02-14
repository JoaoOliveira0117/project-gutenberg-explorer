import { useUser } from "@/hooks/useUser";
import UserDropdown from "./Dropdown";

export default function UserPill() {
  const { user, logout } = useUser()

  if (!user) return null;

  return (
    <UserDropdown email={user.email} onLogout={logout} />
  );
}
