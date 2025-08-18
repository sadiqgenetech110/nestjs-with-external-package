"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("id");
    router.replace("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}
