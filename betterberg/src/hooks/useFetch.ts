import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

const fetcher = async (call: Promise<Response>, router: AppRouterInstance) => {
  try {
    const response = await call;
    if (!response.ok) {
      const error = await response.json()
      
      if (error.status === 401) {
        router.replace('/login')
      }

      throw error;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const useFetch = () => {
  const router = useRouter();

  return (call: Promise<Response>) => fetcher(call, router);
}