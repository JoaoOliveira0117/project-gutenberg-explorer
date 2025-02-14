import { useState } from "react";
import { AiOutlineUser, AiOutlineHeart, AiOutlineBook } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from "../ui/dropdown-menu";
import UserOption from "./Option";

type Props = {
  email: string;
  onLogout: () => void; // Callback para logout
}

const UserDropdown: React.FC<Props> = ({ email, onLogout }) => {
  const nickname = email.split("@")[0];

  return (
    <div className="relative max-h-fit">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer px-2 py-1 pr-4 border border-gray-300 rounded-full bg-white hover:bg-blue-50 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-md">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                <AiOutlineUser />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-800">{nickname}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="absolute bg-white border border-gray-300 shadow-lg rounded-lg p-2 w-40 z-50"
          > 
            <UserOption icon={<AiOutlineUser />} label="Account" onClick={console.log}/>
            <UserOption icon={<AiOutlineHeart />} label="Favorites" onClick={console.log}/>
            <UserOption icon={<AiOutlineBook />} label="Recently Visited" onClick={console.log}/>
            <DropdownMenuSeparator />
            <UserOption icon={<PiSignOutBold className="text-red-600" />} label="Sign Out" onClick={onLogout}/>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}

export default UserDropdown;