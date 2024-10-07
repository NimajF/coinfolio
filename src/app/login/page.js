"use client";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (res.ok) {
        return router.push("/");
      } else {
        console.error("Login failed:", res.error); // Imprime el error si ocurrió un fallo
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(27, 3, 73, 0.6), rgba(0,0,0,0.9)), url(https://plus.unsplash.com/premium_photo-1663931932688-86ce797dcccb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center justify-center min-h-screen bg-gray-900"
    >
      <div
        className="w-full backdrop-blur-xl max-w-md bg-gray-800 p-9 pb-6 rounded-2xl shadow-2xl"
        style={{ background: `#1e293b71` }}
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-7">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 text-sm block w-full px-3 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 text-sm block w-full px-3 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full mt-2 mb-1 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
          <p className="text-sm font-sans text-center ">
            Don't have an account?{" "}
            <a href="/register" className="text-sm text-indigo-500 font-bold">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
