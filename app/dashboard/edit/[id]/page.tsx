import Edit from "@/components/Dashboard/EditPosts/Edit";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
};

async function getPosts(id) {
 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/detail/${id}`);
 return res.json()
}

export default async function page({params}) {
  const { id } = params
  return (
    <>
    <Edit id={id} />
    </>
  )
}
