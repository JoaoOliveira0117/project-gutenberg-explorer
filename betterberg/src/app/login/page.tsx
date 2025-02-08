'use client'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  const handleClick = async () => {
    router.push('http://localhost:9000/api/google/redirect')
  }

  return (
    <div>
      <Button onClick={handleClick}>Login with Google</Button>
    </div>
  );
}
