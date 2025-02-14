import { createContext, ReactNode, useEffect, useState } from "react"
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isFetching: boolean;
  error: any | null;
  logout: () => Promise<void>;
}

type Props = {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  isFetching: false,
  error: null,
  logout: async () => {},
})

const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const router = useRouter();

  const fetcher = useFetch()

  const getUserMe = async () => {
    if (isLoading || isFetching) return;

    setUser(null)
    setIsFetching(true)
    setIsLoading(true)

    return fetcher(fetch('/api/user/me'))
      .then((data) => {
        setUser(data.result)
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
        setIsLoading(false)
      })
  }

  const logout = async () => {
    if (isLoading || isFetching) return;

    setUser(null)
    setIsFetching(true)
    setIsLoading(true)

    return fetcher(fetch('/api/user/logout'))
      .then(() => {
        router.replace('/login')
      })
      .catch(setError)
      .finally(() => {
        setIsFetching(false)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getUserMe();
  }, []);

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