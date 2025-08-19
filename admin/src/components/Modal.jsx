"use client";
import { useState } from "react";
import MediaGalleryModal from "@/components/MediaGalleryModal";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Open Media Gallery
      </button>

      <MediaGalleryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
