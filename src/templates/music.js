import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
//import { sanitizeHtml } from "../utilities";

const MusicTemplate = ({ data }) => {

  return (
    <Layout>
      <h1 className="container">
        {data.space.title}
      </h1>
      <div className="container">
        <GatsbyImage image={getImage(data.space.relationships.field_image.localFile)} alt={data.space.title} />
        <div dangerouslySetInnerHTML={{ __html: data.space.body.processed}} />
      </div>
    </Layout>
  )
};

export const query = graphql`
  query ($alias: String!) {
    space: nodeMusic(path: {alias: {eq: $alias}}, status: {eq: true}) {
      title
      body {
        processed
      }
      path {
        alias
      }
      id
      relationships {
        field_image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;

export default MusicTemplate;