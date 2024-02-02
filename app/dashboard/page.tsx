import Dashboard from "@/components/Dashboard/Dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`
}

export default function page() {
  return (
    <>
        <Dashboard />
    </>
  )
}
