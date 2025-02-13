"use client"

import BookByIdProvider from "@/context/bookById.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookByIdProvider>
      {children}
    </BookByIdProvider>
  );
}
