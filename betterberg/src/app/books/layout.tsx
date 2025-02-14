"use client"

import Header from "@/components/Header/Header";
import UserProvider from "@/context/user.provider";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Header />
      {children}
    </UserProvider>
  );
}
