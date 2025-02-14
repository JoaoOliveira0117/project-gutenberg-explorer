"use client"

import BooksProvider from "@/context/books.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BooksProvider>
      {children}
    </BooksProvider>
  );
}
