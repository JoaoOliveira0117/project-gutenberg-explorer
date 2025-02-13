import BookTextContainer from "@/components/BookText/BookTextContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = (await params)
  return (
    <BookTextContainer id={id} />
  );
}
