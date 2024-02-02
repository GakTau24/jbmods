import Register from "@/components/SignUp/Register"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register Page"
}

export default function page() {
  return (
    <>
        <Register />
    </>
  )
}
