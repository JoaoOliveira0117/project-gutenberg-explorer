import { createContext, ReactNode, useState } from "react"
import { User } from "@/types";

type UserContextType = {
  user: User[];
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  logout: () => void;
}

type Props = {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: [],
  isLoading: false,
  isFetching: false,
  error: null,
  logout: () => {},
})

const UserProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const [user, setUser] = useState<User[]>([]);

  const logout = () => {
    setUser([])
  }

  return (
    <UserContext.Provider value={
      {
        user,
        isLoading,
        isFetching,
        error,
        logout,
      }
    }>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;