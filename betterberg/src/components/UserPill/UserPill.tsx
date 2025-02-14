import { useUser } from "@/hooks/useUser";
import UserDropdown from "./Dropdown";
import { CgSpinner } from "react-icons/cg";

export default function UserPill() {
  const { user, isLoading, logout } = useUser()

  if (isLoading) return (
    <div className="max-w-6xl mx-auto">
      <CgSpinner size={28} className="animate-spin min-h-8 min-w-8 text-blue-600 m-auto" />
    </div>
  );

  if (!user) {
    return
  }

  return (
    <UserDropdown email={user!.email} onLogout={logout} />
  );
}
