"use client";

import { useState, useEffect } from "react";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";
import { User, Role, UserStatus } from "@/types";

type UserFormProps = {
  user: User;
  onSubmit: (data: FormData) => void;
};

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    picture: "",
    role: "USER" as Role,
    status: "ACTIVE" as UserStatus,
    isVerified: false,
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        picture: user.picture ?? "",
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value.toString())
    );
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-neutral rounded-lg shadow-md space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-yellow-200"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-yellow-200"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          type="text"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium mb-1">Profile Picture</label>
        <CloudinaryUpload
          value={form.picture}
          onChange={(url) => setForm((prev) => ({ ...prev, picture: url }))}
          folder="users"
        />
        <input type="hidden" name="picture" value={form.picture} />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="USER">USER</option>
          <option value="MODERATOR">MODERATOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="BLOCK">BLOCK</option>
        </select>
      </div>

      {/* Verified */}
      <div className="flex items-center gap-2">
        <input
          id="isVerified"
          name="isVerified"
          type="checkbox"
          checked={form.isVerified}
          onChange={handleChange}
        />
        <label htmlFor="isVerified" className="text-sm font-medium">
          Verified
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full border border-amber-500 bg-yellow-800 font-medium text-white py-2 rounded-md hover:bg-yellow-700 transition"
      >
        Update User
      </button>
    </form>
  );
}