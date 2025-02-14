"use client"

import FavoriteBooksProvider from "@/context/favoriteBooks.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FavoriteBooksProvider>
      {children}
    </FavoriteBooksProvider>
  );
}
