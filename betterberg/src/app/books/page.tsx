'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Books() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/books/all");
  }, [router]);

  return <></>;
}
