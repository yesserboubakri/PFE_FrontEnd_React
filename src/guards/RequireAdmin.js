import React from "react";
import { Redirect } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user_9antra"));

  if (!user || user.role !== "admin") {
    return <Redirect to="/MonEspace" />;
  }

  return children;
}
