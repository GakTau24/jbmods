import Edit from "@/components/Dashboard/EditPosts/Edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:`Edit Post - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};

export default async function page({params}) {
  const { id } = params
  return (
    <>
    <Edit id={id} />
    </>
  )
}
