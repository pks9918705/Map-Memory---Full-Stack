import React from "react";
import { useValue } from "../context/authContext";

export default function Home() {
  const { user, authenticated } = useValue();

  return (
    <>
      {authenticated && (
        <div>
          <h1 style={{ textAlign: "center" }}>Welcome to Home Page</h1>
          <p>user:{user}</p>
        </div>
      )}
    </>
  );
}
