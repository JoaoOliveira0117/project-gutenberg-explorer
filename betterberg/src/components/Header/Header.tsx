"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserPill from "../UserPill/UserPill";

const NAV_ITEMS = [
  { name: "Home", path: "/books/all" },
  { name: "Favorites", path: "/books/favorites" },
  { name: "Recently Visited", path: "/books/recent" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="w-full shadow-md p-4 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Button variant="link" className="text-xl font-bold" onClick={() => router.push("/")}>
          Betterberg
        </Button>

        {/* Navbar */}
        <nav className="flex gap-6">
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} href={item.path} className="relative">
              <span
                className={cn(
                  "text-gray-600 hover:text-gray-900 transition-all px-3 py-1",
                  pathname === item.path && "text-black font-semibold border-b-2 border-black"
                )}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <UserPill />
        </div>
      </div>
    </header>
  );
}