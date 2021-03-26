import React from "react";
import { isAuthenticated, logout } from "../utils/auth";
import Layout from "../components/layout";

const Logout = ()  => {
  if (isAuthenticated()) {
    logout()
    return <div className="container mt-5">Redirecting to logout...</div>
  }

  return (
    <Layout>
      Logged out
    </Layout>
  )
}

export default Logout