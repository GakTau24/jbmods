"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@prisma/client";
import Modal from "../Modal/Modals";
import AlertsDelete from "../Alert/AlertsDelete";

function Dashboard() {
  const { data: session } = useSession<any>();
  const [userPosts, setUserPosts] = useState([]);
  const [getsession, setGetSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`
        );
        setGetSession(res.data.user.id);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
        );
        const posts = response.data.posts;
        const filteredPosts = posts.filter(
          (post) => post.authorId === getsession
        );

        setUserPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getsession]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/detail/${postId}`
      );
      setShowModal(false);
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteClick = (id: any) => {
    setShowModal(true);
    setDeleteId(id);
  };

  return (
    <div className="flex flex-col py-3 my-5">
      <h1 className="text-xl font-semibold px-10">Welcome to Dashboard</h1>
      <Link
        href={"/dashboard/create"}
        className="bg-blue-500 hover:bg-blue-600 flex w-20 p-3 lg:mx-20 max-sm:mx-10 rounded-lg mt-5">
        Create
      </Link>
      <div className="p-4 rounded-md max-sm:mx-auto lg:mx-20 py-5">
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-600 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Content</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post: Post) => (
              <tr key={post.id} className="border-t">
                <td className="py-2 px-4">{post.id}</td>
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{post.content}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">
                      <Link href={`/dashboard/edit/${post.id}`}>Edit</Link>
                    </button>
                    <button
                      className="bg-red-600 p-2 rounded-md text-white"
                      onClick={() => handleDeleteClick(post.id)}>
                      Delete
                    </button>
                  </div>
                </td>
                {showAlert && (
                  <div className="fixed top-[70px] max-sm:top-16 right-4 md:right-1 max-md:h-10 max-md:right-0">
                    <AlertsDelete title={post.title} />
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleDeleteClick={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
}

export default Dashboard;
