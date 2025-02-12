import UserDropdown from "./Dropdown";

interface UserPillProps {
  email: string;
  onLogout: () => void;
}

export default function UserPill({ email, onLogout }: UserPillProps) {
  return (
    <UserDropdown email={email} onLogout={onLogout} />
  );
}
