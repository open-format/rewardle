import React, { useState } from "react";
import Router from "next/router";
import LoginButton from "../components/LoginButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirect on successful login
      Router.push("/");
    } else {
      // Handle errors
      console.error("Login failed");
    }
  };

  return (
    <>
      <h1>Web3</h1>
      <LoginButton></LoginButton>

      <h2>Magic Link</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
