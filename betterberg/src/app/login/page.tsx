'use client'
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from 'react-icons/ai'; // Para o ícone Google, você pode usar qualquer outra abordagem de ícones.

export default function Login() {
  const router = useRouter();

  const handleClick = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/redirect`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-6 bg-white rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-4xl font-bold text-gray-800">Betterberg.</h1>
        <h4 className="text-sm font-bold text-gray-800">now with AI!</h4>
        <Button
          onClick={handleClick}
          variant="default"
          className="w-full bg-blue-500 text-white text-lg py-3 rounded-md flex items-center justify-center space-x-3 hover:bg-blue-600 focus:outline-none"
        >
          <AiOutlineGoogle className="text-white" />
          <span>Login with Google</span>
        </Button>
      </div>
    </div>
  );
}
