import { DropdownMenuItem, } from "../ui/dropdown-menu";

type Props = {
  label: string;
  icon: React.ReactElement
  onClick: () => void;
}

const UserOption: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <DropdownMenuItem
      className="text-sm p-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </DropdownMenuItem>
  );
}

export default UserOption;