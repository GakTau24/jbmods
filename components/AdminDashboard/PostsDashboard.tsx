// "use client"
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { InView } from "react-intersection-observer";
// import axios from "axios";
// import UserModal from "../Dashboard/UserModal";
// import Sidebar from "./SidebarAdminDashboard";
// import { Post } from "@prisma/client";

// function PostsDashboard() {
//   const { data: session } = useSession();
//   const userRole = session?.user?.role;
//   const router = useRouter();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/api/posts/admin");
//         setPosts(response.data.posts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (userRole !== "ADMIN") {
//     router.push("/");
//     return null;
//   }

//   const handleDeletePost = async (postId) => {
//     try {
//       await axios.delete(`/api/posts/admin/${postId}`);
//       setPosts((prevPosts) => prevPosts.filter((post:any) => post.id !== postId));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//     <div className="flex flex-col py-3 my-5 w-full">
//       <motion.h1
//         className="text-xl font-semibold px-10 text-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         Welcome to Dashboard {session?.user?.name}
//       </motion.h1>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       ></motion.div>
//       <div className="p-4 rounded-md max-sm:mx-auto lg:mx-20 py-5">
//         <motion.h2
//           className="text-xl font-semibold mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           Your Posts
//         </motion.h2>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="pt-3"
//         >
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-slate-600 text-white">
//                   <th className="py-2 px-4 text-left">ID</th>
//                   <th className="py-2 px-4 text-left">Title</th>
//                   <th className="py-2 px-4 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {posts.map((post:Post) => (
//                   <InView key={post.id}>
//                     {({ inView, ref }) => (
//                       <motion.tr
//                         className="border-t"
//                         ref={ref}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={
//                           inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//                         }
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                       >
//                         <td className="py-2 px-4">{post.id}</td>
//                         <td className="py-2 px-4">{post.title}</td>
//                         <td className="py-2 px-4">
//                           <div className="flex space-x-2">
//                             <button
//                               className="bg-red-600 hover:bg-red-800 p-2 rounded-md text-white"
//                               onClick={() => handleDeletePost(post.id)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     )}
//                   </InView>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </motion.div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default PostsDashboard;
