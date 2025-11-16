"use client";

import React, { useState } from "react";
import Image from "next/image";

type CloudinaryUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function CloudinaryUpload({ value, onChange, folder }: CloudinaryUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_unsigned"
      );
      if (folder) formData.append("folder", folder);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (data?.secure_url) onChange(data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative w-32 h-32">
          <Image
            src={value}
            alt="Uploaded"
            fill
            unoptimized
            className="object-cover rounded-md"
            priority={true}
          />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}