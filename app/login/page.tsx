"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, loading } = useAuth();

  async function onLogin() {
    await login(email, password);
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <div className="login">
      <div className="box">
        <div className="head">
          <h2>School Management System</h2>
          <p>Sign in to continue</p>
        </div>
        <div className="inputs">
          <div className="inp">
            <p>Email Address</p>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inp">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            onLogin();
          }}
          disabled={loading}
        >
          {loading ? "signing up..." : "sign up"}
        </button>
      </div>
    </div>
  );
}
