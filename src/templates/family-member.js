import React from 'react';
import { graphql } from 'gatsby';
import { isAuthenticated, login } from "../utils/auth";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const FamilyMemberTemplate = ({ data }) => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }

  return (
    <Layout>
      <h1 className="container mt-5">
        {data.family.title}
      </h1>
      <div className="container">
        <GatsbyImage image={getImage(data.family.relationships.field_member_picture.localFile)} alt={data.family.title} />
        {data.family.body !== null ?
        <div dangerouslySetInnerHTML={{ __html: data.family.body.processed}} />
        :
        ''
        }
      </div>
    </Layout>
  )
};

export const query = graphql`
  query ($alias: String!) {
    family: nodeFamilyMember(path: {alias: {eq: $alias}}, status: {eq: true}) {
      title
      body {
        processed
      }
      path {
        alias
      }
      id
      relationships {
        field_member_picture {
          localFile {
            childImageSharp {
              gatsbyImageData(
                height: 400
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

export default FamilyMemberTemplate;