export const getAllUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
    next: { tags: ["USERS"] },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const json = await res.json();
  return json.data || json.users || json;
};
export const getUserById = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`);
  return await res.json();
};

export const updateUser = async (userId: string, formData: FormData) => {
  const userInfo = Object.fromEntries(formData.entries());
  const payload = {
    ...userInfo,
    isVerified: Boolean(userInfo.isVerified === "true"),
  };
  // console.log("payload", payload)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return result;
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`, { method: "DELETE" });
  return res.json();
};