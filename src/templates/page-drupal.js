import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";
//import { sanitizeHtml } from "../utilities";

const PageNodeTemplate = ({ data }) => {

  return (
    <Layout>
      <div className="container" dangerouslySetInnerHTML={{ __html: data.page.body.processed}} />
    </Layout>
  )
};

export const query = graphql`
  query ($alias: String!) {
    page: nodePage(path: {alias: {eq: $alias}}, status: {eq: true}) {
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
`;

export default PageNodeTemplate;