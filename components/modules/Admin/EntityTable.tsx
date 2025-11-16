"use client";

import { DeleteIcon, Edit, Loader } from "lucide-react";


type EntityTableProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
};

export default function EntityTable<T extends { id: number }>({ data = [], columns = [], onEdit, onDelete }: EntityTableProps<T>) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center gap-2 p-4">
      <Loader className="h-8 w-8 animate-spin text-yellow-700" />
      <span className="text-xl font-medium text-yellow-700">Loading...</span>
    </div>;
  }

  return (
    <table className="w-full border-collapse border border-gray-500">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="border px-4 py-2 text-left">{col.label}</th>
          ))}
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={String(col.key)} className="border px-4 py-2">{String(item[col.key] || "")}</td>
            ))}
            <td className="border px-4 py-2 flex gap-2">
              <button onClick={() => onEdit(item)} className="px-2 py-1 bg-sky-500 rounded-md"><Edit /></button>
              <button onClick={() => onDelete(item.id)} className="px-2 py-1 bg-red-800 rounded-md"><DeleteIcon /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}