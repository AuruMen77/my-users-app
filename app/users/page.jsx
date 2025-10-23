"use client";

import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import CreateUserModal from "../../components/CreateUserModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch users from the API route
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle new user creation
  const handleUserCreated = async (newUser) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to create user");

      const created = await res.json();
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Failed to create user.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Create User
        </button>
      </div>

      {/* Users Grid */}
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Create User Modal */}
      {showModal && (
        <CreateUserModal
          onClose={() => setShowModal(false)}
          onUserCreated={(user) => {
            handleUserCreated(user);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
