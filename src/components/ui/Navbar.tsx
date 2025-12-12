"use client";
//just for testing
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in cookies (client side)
    const token = document.cookie.includes("token=");
    setIsLoggedIn(token);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    document.cookie = "token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    window.location.href = "/signin";
  };

  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      padding: "15px",
      background: "#1e1e1e",
      color: "white",
    }}>
      <Link href="/">Home</Link>

      {!isLoggedIn && (
        <>
          <Link href="/signup">Signup</Link>
          <Link href="/signin">Signin</Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <button 
            onClick={handleLogout} 
            style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
