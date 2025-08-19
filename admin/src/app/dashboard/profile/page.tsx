"use client";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/services/authApi";
import { useEffect, useState } from "react";
import MediaGallery from "../../../components/MediaGallery";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserId(id);
  }, []);

  const { data, error, isLoading } = useGetUserQuery(
    { collection: "users", id: userId ?? "" },
    { skip: !userId } // 🔹 skip until we have ID
  );

  if (!userId) return <p className="p-4">⚠️ No User ID found, please login again.</p>;
  if (isLoading) return <p className="p-4">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-500">❌ Failed to load profile</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 User Profile</h1>
      <div className="space-y-2">
        {data &&
          Object.entries(data).filter(([key]) => key !== "token").map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold">{key}:</span> {String(value)}
            </p>
          ))}
      </div>
      <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Media Gallery</Button>

      {/* Controlled Modal */}
      <MediaGallery open={open} onOpenChange={setOpen} />
    </div>
    </div>
  );
}
