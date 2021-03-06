import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout";
//import { sanitizeHtml } from "../utilities";

const Home = ({data }) => (
  <Layout>
         {
      data.page.body !== null ?
      <div className="container" dangerouslySetInnerHTML={{ __html: data.page.body.processed}} />
      :
      <div className="container">
        <div className="pt-5 pb-5 text-center">
          Forgot to change homepage alias to /homepage-poc before gatsby develop/build
          <br />
          ¯\_(ツ)_/¯
        </div>
      </div>
    }
  </Layout>
)

export default Home

export const query = graphql`
  query {
    page: nodePage(path: {alias: {eq: "/about-me"}}, status: {eq: true}) {
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
