"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Register() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // useEffect(() => {
  //   console.log(session);
  //   if (session) return router.push("/");
  // }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupResponse = await axios.post("/api/register", formData);
      console.log(signupResponse);

      const res = await signIn("credentials", {
        username: signupResponse.data.newUser.username,
        password: formData.password,
        redirect: false,
      });
      if (res.ok) return router.push("/");

      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(27, 3, 73, 0.6), rgba(0,0,0,0.9)), url(https://plus.unsplash.com/premium_photo-1663931932688-86ce797dcccb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full max-w-5xl max-md:flex-col bg-transparent rounded-2xl shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-2/3 max-md:w-full p-9 flex flex-col justify-center items-center bg-indigo-600 text-white rounded-l-2xl bg-opacity-50 backdrop-blur-md max-md:bg-indigo-800 max-md:rounded-none max-md:p-2"
        >
          <h1 className="text-5xl max-md:text-4xl max-md:text-center font-bold mb-4 text-zinc-200 bg-indigo-500 p-3 rounded-lg bg-opacity-50">
            Welcome to Coinfolio
          </h1>
          <p className="mb-5 text-xl max-md:text-center max-md:mb-1">
            The ultimate tool for tracking and managing your cryptocurrency
            investments with ease.
          </p>
          <ul className="p-2 list-disc list-inside text-md space-y-1 rounded-lg">
            <li>
              Seamless experience for tracking market movements in real-time.
            </li>
            <li>
              Monitor and manage your cryptocurrency portfolio effortlessly.
            </li>
            <li>Optimize your investment strategy with real-time data.</li>
            <li>Suitable for both seasoned investors and beginners.</li>
            <li>Simplifies the complexity of the crypto market.</li>
            <li>
              Provides insights to help make confident investment decisions.
            </li>
          </ul>
          {/* <img
            src="https://your-image-url.com"
            alt="App preview"
            className="mt-6 rounded-lg shadow-lg"
          /> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-1/2 max-md:p-5 max-md:w-full p-9 bg-gray-800 rounded-r-2xl backdrop-blur-lg"
          style={{ background: `rgba(42, 42, 43, 0.671)` }}
        >
          <h2 className="text-2xl font-semibold text-slate-200 text-center mb-7 mt-6">
            Create your account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 text-sm block w-full px-3 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="set a username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 text-sm block w-full px-3 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="enter your email"
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
                onClick={handleSubmit}
                className="w-full mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
            <p className="text-sm font-sans text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-sm text-indigo-500 font-bold transition-all hover:underline hover:underline-offset-2 hover:text-indigo-400"
              >
                Sign In
              </a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
