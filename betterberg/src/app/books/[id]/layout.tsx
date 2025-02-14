"use client"

import BottomBar from "@/components/BookText/BottomBar";
import BookByIdProvider from "@/context/bookById.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookByIdProvider>
      <BottomBar />
      {children}
    </BookByIdProvider>
  );
}
