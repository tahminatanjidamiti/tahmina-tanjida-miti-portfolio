"use client";

import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/services/UserServices";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import UserForm from "@/components/modules/Admin/UserForm";
import { User } from "@/types";
import { Loader } from "lucide-react";

export default function EditUserPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        const data = await getUserById(id);
        setUser(data);
        setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
      const result = await updateUser(id, formData);
      if (result?.id) {
        toast.success("User updated successfully!");
        router.push("/dashboard/users");
  };
}

  if (loading) return <div className="flex items-center justify-center gap-2 p-4">
      <Loader className="h-8 w-8 animate-spin text-yellow-700" />
      <span className="text-xl font-medium text-yellow-700">Loading...</span>
    </div>;
  if (!user) return <p className="text-center text-gray-500">User not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserForm user={user} onSubmit={handleUpdate} />
    </div>
  );
}