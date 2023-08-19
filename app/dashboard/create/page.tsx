import Create from "@/components/Dashboard/CreatePosts/Create"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Posts"
}

async function page() {
  return (
    <>
    <Create />
    </>
  )
}

export default page