import Dashboard from "@/components/AdminDashboard/Dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Admin Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Admin Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
}

function page() {
  return (
    <>
    <Dashboard />
    </>
  )
}

export default page