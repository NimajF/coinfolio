"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getUser } from "@/utils/favoritesHandler";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

export default function Edit({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = params;

  const [formData, setFormData] = useState({
    bio: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.username && session.user.username !== id) {
      router.push(`/user/${id}`);
    }
  }, [status, session, id, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?._id) {
        const res = await getUser(session.user._id);
        if (res.success) {
          setFormData({
            bio: res.data.bio || "",
            email: res.data.email || "",
          });
        }
        setLoading(false);
      }
    };

    if (session?.user?._id) {
      fetchUserData();
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully!");
        router.push(`/user/${id}`);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a15] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] text-white p-6 lg:p-12 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[#2a2a3e] rounded-full transition-colors"
          >
            <IoArrowBack className="w-6 h-6 text-slate-400" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Username
            </label>
            <input
              type="text"
              value={id}
              disabled
              className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-xl p-3 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">
              Username cannot be changed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#0a0a15]/50 border border-[#2a2a3e] rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#2a2a3e] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
