"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadMediaMutation } from "../services/mediaApi";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MediaGallery({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
//   const { data: mediaList, isLoading } = useGetMediaQuery();
  const [uploadMedia] = useUploadMediaMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    console.log(file);
    if (!file) return toast.error("Please select a file!");
    const formData = new FormData();
    formData.append("gallery", file);

    try {
      await uploadMedia(formData).unwrap();
      toast.success("✅ Media uploaded!");
      setFile(null);
    } catch {
      toast.error("❌ Upload failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Media Gallery</h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Media List */}
          {/* <div className="col-span-2 grid grid-cols-3 gap-2 border p-2 rounded-md h-80 overflow-y-auto">
            {isLoading && <p>Loading...</p>}
            {mediaList?.map((media) => (
              <img
                key={media.id}
                src={media.url}
                alt="media"
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div> */}

          {/* Upload Form */}
          <div className="col-span-1 border p-4 rounded-md flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
            <Button onClick={handleUpload} className="mt-3 w-full">
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
