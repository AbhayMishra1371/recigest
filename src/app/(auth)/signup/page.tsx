"use client";

import axios from "axios";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users", form);
      alert("Signup successful: " + JSON.stringify(res.data));
    } catch (err: any) {
      alert("Error: " + err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          required
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-400"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
