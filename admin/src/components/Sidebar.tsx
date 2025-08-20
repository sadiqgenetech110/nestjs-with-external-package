"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/home", label: "Home" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/chat", label: "chats" },
  ];

  return (
    <aside className="w-60 bg-gray-100 h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2 rounded ${
                  pathname === link.href
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
