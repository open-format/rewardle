"use client";
import React from "react";
import Leaderboard from "../components/Leaderboard";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";

const Home = () => {
  return (
    <div>
      <h1>Welcome to OPENFORMAT GetStarted!</h1>
      <Leaderboard />
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
    </div>
  );
};

export default Home;
