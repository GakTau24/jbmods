import Dashboard from "@/components/Dashboard/Dashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Page"
}

export default function page() {
  return (
    <>
        <Dashboard />
    </>
  )
}
