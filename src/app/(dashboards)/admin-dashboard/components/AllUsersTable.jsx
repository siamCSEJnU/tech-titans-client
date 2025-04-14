"use client";
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const AllUsersTable = ({ users, onRoleChange, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table w-full bg-white rounded-lg shadow-2xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.image || "/profile.png"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.mobile_number || "-"}</td>
              <td className="p-3 capitalize">{user.type}</td>
              <td className="p-3">
                <div className="flex items-center space-x-2 ">
                  <select
                    value={user.type}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                    className="border rounded p-1 text-sm cursor-pointer"
                  >
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
                  </select>
                  <button
                    onClick={() => onDelete(user.email)}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    title="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users?.map((user, index) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={user.image || "/profile.png"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    #{index + 1} • {user.type.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDelete(user.email)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Delete user"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Mobile</p>
                <p className="text-sm font-medium">
                  {user.mobile_number || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-500">Role</p>
                <select
                  value={user.type}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  className="w-full text-sm bg-white border rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsersTable;
