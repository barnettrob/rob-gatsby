import React from "react";
import { isAuthenticated, getProfile } from "../utils/auth";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const User = ({ user }) => {
  if (!isAuthenticated()) {
  return <div className="container mt-5">
    Welcome, {user.name ? user.name : "friend"}!
  </div>
  }
  else {
    return <div className="container mt-5">
      Login to see family information.
    </div>
  }
}

const Home = ({data }) => {
  const user = getProfile();

  return (
    <Layout>
      <User user={user} />
          {
        data.page.body !== null ?
        <div className="container mt-5" dangerouslySetInnerHTML={{ __html: data.page.body.processed}} />
        :
        <div className="container mt=5">
          <div className="pt-5 pb-5 text-center">
            Forgot /about page before gatsby develop/build
            <br />
            ¯\_(ツ)_/¯
          </div>
        </div>
      }
    </Layout>
  )
}

export default Home

export const query = graphql`
  query {
    page: nodePage(path: {alias: {eq: "/about"}}, status: {eq: true}) {
      title
      body {
        processed
      }
      path {
        alias
      }
      id
    }
  }  
`
