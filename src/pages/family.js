import React from "react";
import { Router } from "@reach/router";
import { login, isAuthenticated, getProfile } from "../utils/auth";
import { Link } from "gatsby";
import Layout from "../components/layout";

const Home = ({ user }) => {
  return <div className="container mt-5">
    Welcome, {user.name ? user.name : "friend"}!
  </div>
}

const FamilyMember = () => <div>Family Member</div>
const Logout = () => <div>Logout</div>

const Family = () => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }

  const user = getProfile();
  
  return (
  <Layout>
    <div className="container mt-5">
    <nav>
        <Link to="/family/">Home</Link>{" "}
        <Link to="/family/members/">Family Members</Link>{" "}
        <Link to="/logout">Logout</Link>{" "}
      </nav>
      <Router>
        <Home path="/family/" user={user} />
        <FamilyMember path="/family/members" />
        <Logout path="/logout" />
      </Router>
    </div>
  </Layout>
  )
}

export default Family