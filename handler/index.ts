import { signIn } from "next-auth/react";

export const loginUser = async ({email, password}) => {
    const res = await signIn("credentials", {
        redirect: false,
        email,
        password
    })

    return res
}

interface UserData {
    id: number;
    name: string;
    email: string;
    // Add any other relevant properties
  }
  
  interface SessionData {
    user: UserData;
    expires: string;
  }