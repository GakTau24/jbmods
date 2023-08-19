"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error && error.name === "CredentialsProviderError") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  if (session) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-opacity-25 bg-gray-900 backdrop-blur-md p-8 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-transparent border-violet-600 ring-1 focus:ring-violet-600 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEye size={25} />
                ) : (
                  <AiFillEyeInvisible size={25} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md">
            Log In
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <p className="pt-4 text-right">
            Dont have an account?
            <Link href="/register">
              {" "}
              <span className="text-cyan-500 hover:text-cyan-600">
                Register
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
