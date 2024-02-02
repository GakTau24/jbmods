import Create from "@/components/Dashboard/CreatePosts/Create"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Create Posts - ${process.env.NEXT_PUBLIC_SITE_NAME}`
}

async function page() {
  return (
    <>
    <Create />
    </>
  )
}

export default page