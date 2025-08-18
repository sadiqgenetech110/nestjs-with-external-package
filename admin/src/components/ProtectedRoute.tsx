"use client";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("id");
    if (!token) {
      router.replace("/login"); // redirect if not logged in
    }
  }, [router]);

  return <>{children}</>;
}
