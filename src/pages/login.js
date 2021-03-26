import React from "react";
import { isAuthenticated, login } from "../utils/auth";
import Layout from "../components/layout";

const Logout = ()  => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }

  return (
    <Layout>
      Logged in
    </Layout>
  )
}

export default Logout