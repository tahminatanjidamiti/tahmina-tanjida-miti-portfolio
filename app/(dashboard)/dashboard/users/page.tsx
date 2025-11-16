"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/services/UserServices";
import { useRouter } from "next/navigation";
import EntityTable from "@/components/modules/Admin/EntityTable";
import { Loader } from "lucide-react";

export default function UsersDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        // console.log("API RESPONSE:", res);

        const usersArray =
          Array.isArray(res)
            ? res
            : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.users)
            ? res.users
            : [];

        setUsers(usersArray);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(String(id));
    setUsers(users.filter((u) => u.id !== id));
  };

  if (!users.length) {
    return <div className="flex items-center justify-center gap-2">
      <Loader className="h-8 w-8 animate-spin text-yellow-700" />
      <span className="text-xl font-medium text-yellow-700">Loading...</span>
    </div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <EntityTable
        data={users}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
        ]}
        onEdit={(item) => router.push(`/dashboard/users/${item.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
