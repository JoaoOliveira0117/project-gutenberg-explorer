import Book from "@/components/Book";
import { Container } from "@mui/material";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = (await params)
  return (
    <Book id={id} />
  );
}
