import LoginForm from "@/components/SignIn/Login"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login Page"
}

export default function page() {
  return (
    <>
    <LoginForm />
    </>
  )
}
