'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define routes that should NOT use sidebar/header
  const noLayoutRoutes = ["/login"];

  const isAuthPage = noLayoutRoutes.includes(pathname);

  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Toaster />
          {isAuthPage ? (
            // For login (or other public pages)
            <main className="flex items-center justify-center h-screen">
              {children}
            </main>
          ) : (
            // For protected/dashboard pages
            <ProtectedRoute>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="p-6 flex-1 overflow-y-auto">{children}</main>
                </div>
              </div>
            </ProtectedRoute>
          )}
        </body>
      </html>
    </Provider>
  );
}
