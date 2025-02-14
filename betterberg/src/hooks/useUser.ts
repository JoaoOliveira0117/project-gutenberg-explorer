import { UserContext } from "@/context/user.provider";
import { useContext } from "react";

export function useUser() {
  return useContext(UserContext);
}