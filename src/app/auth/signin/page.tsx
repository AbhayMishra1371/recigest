"use client";
import { useState } from "react";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signin</h2>
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
