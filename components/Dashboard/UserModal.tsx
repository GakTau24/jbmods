"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function UserModal({ setShowModal }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/users", { userId, newRole });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "ADMIN") {
    router.push("/");
    return null;
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        <div className="border-0 rounded-lg shadow-lg relative bg-opacity-40 backdrop-filter backdrop-blur-lg backdrop-saturate-200 flex flex-col w-full outline-none focus:outline-none">
          <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h1 className="text-xl font-semibold text-white">
              Update User Role
            </h1>
            <form onSubmit={handleUpdateRole} className="my-3 py-3">
              <label>
                User ID:
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="shadow-xl my-4 p-2 mx-4 bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
                />
              </label>
              <br />
              <label>
                New Role:
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="shadow-xl my-4 p-2 mx-4 bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </label>
              <br />
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 p-3 rounded-lg my-3 flex justify-center items-center text-center">
                  Update
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg my-3 flex justify-center items-center text-center"
                  onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
