import React from "react";
import { graphql } from 'gatsby';
import { login, isAuthenticated } from "../utils/auth";
// import { Link } from "gatsby";
import Layout from "../components/layout";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const Family = ({ data }) => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }
  
  console.log("all_family", data)
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;
  const posts = data.all_family.edges

  return (
  <Layout>
    <div className="container mt-5">
      <Tree 
        label={<div>Kleinberg Family Tree</div>}
        lineWidth={'2px'}
        lineColor={'blue'}
        lineBorderRadius={'10px'}
      >
        {posts.filter(person => person.node.relationships.field_descendent_parent === null).map(({ node }) => (
          <TreeNode key={node.drupal_id}
            label={<StyledNode>{node.title}</StyledNode>}
          >
            {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
              <TreeNode key={node.drupal_id}
                label={<StyledNode>{node.title}</StyledNode>}
                >
                  {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                    <TreeNode key={node.drupal_id}
                      label={<StyledNode>{node.title}</StyledNode>}
                    >
                    </TreeNode>
                  ))}
                </TreeNode>
            ))}
          </TreeNode>
        ))}
      </Tree>
    </div>
  </Layout>
  )
}

export const query = graphql`
  query {
    all_family: allNodeFamilyMember {
      edges {
        node {
          title
          drupal_id
          relationships {
            field_member_picture {
              localFile {
                childrenImageSharp {
                  gatsbyImageData(height: 50, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            field_descendent_parent {
              title
            }
          }
        }
      }
    }
  }
`;

export default Family