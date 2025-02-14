"use client"

import LastSeenBooksProvider from "@/context/lastSeenBooks.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LastSeenBooksProvider>
      {children}
    </LastSeenBooksProvider>
  );
}
