"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InView } from "react-intersection-observer";
import axios from "axios";
import UserModal from "../Dashboard/UserModal";
import Sidebar from "./SidebarAdminDashboard";

interface Users {
  id: string;
  name: string;
  role: string
}

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserData();
    if (userRole !== "ADMIN") {
      router.push("/");
    }
  }, [userRole, router]);

  const handleUpdateClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleDeleteClick = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      try {
        await axios.delete("/api/users", { data: { userId } });
        setUsers((prevUsers) => prevUsers.filter((user:any) => user.id !== userId));
        if (session?.user?.id === userId) {
          await signOut();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
    <div className="flex h-screen flex-col py-3 my-5 w-full">
      <motion.h1
        className="text-xl font-semibold px-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        Welcome to Admin Dashboard {session?.user?.name}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}></motion.div>
      <div className="p-4 rounded-md max-sm:mx-auto lg:mx-20 py-5">
        <motion.h2
          className="text-xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Your Posts
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-3">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-600 text-white">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: Users) => (
                <InView key={user.id}>
                  {({ inView, ref }) => (
                    <motion.tr
                      className="border-t"
                      ref={ref}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.2 }}>
                      <td className="py-2 px-4">{user.id}</td>
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.role}</td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white"
                          onClick={handleUpdateClick}>
                            Update
                          </button>
                          <button className="bg-red-600 hover:bg-red-800 p-2 rounded-md text-white"
                          onClick={() => handleDeleteClick(user.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                      {showModal && <UserModal setShowModal={setShowModal} />}
                    </motion.tr>
                  )}
                </InView>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
    </div>
  );
}

export default UserDashboard;
