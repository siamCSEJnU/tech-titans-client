"use client";
import React, { useEffect, useState } from "react";
import AllUsersTable from "./components/AllUsersTable";

import { deleteUser, fetchAllUsers, updateUserRole } from "@/lib/apis/user-api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, type: newRole } : user
        )
      );
      toast.success("Role updated successfully", { autoClose: 1200 });
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userEmail) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userEmail);
        setUsers(users.filter((user) => user.email !== userEmail));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire("Error!", error.message, "error");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <AllUsersTable
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default AdminDashboard;
