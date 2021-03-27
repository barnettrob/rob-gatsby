import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { login, isAuthenticated } from "../utils/auth";
import Layout from "../components/layout";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
//import { sanitizeHtml } from "../utilities";

const StyledNode = styled.div`
padding: 10px;
border-radius: 8px;
display: inline-block;
border: 1px solid #3aa88e;
position: relative;
`;

const StyledInnerNode = styled.div`
margin: 0 auto;
postion: relative;
width: 110px;
`;

const PageNodeTemplate = ({ data }) => {
  if (!isAuthenticated()) {
    login()
    return <div className="container mt-5">Redirecting to login...</div>
  }
  
  const posts = data.all_family.edges

  return (
    <Layout>
      <div className="container mt-5">
        <Tree 
          label={<div>Kleinberg Family Tree</div>}
          lineWidth={'2px'}
          lineColor={'#89a9df'}
          lineBorderRadius={'10px'}
        >
          {posts.filter(person => person.node.relationships.field_descendent_parent === null).map(({ node }) => (
            <TreeNode key={node.drupal_id}
              label={<StyledNode>
                      <StyledInnerNode>
                        {node.relationships.field_member_picture.localFile !== null &&
                            <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                            {node.title}
                      </StyledInnerNode>
                </StyledNode>}
            >
              {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                <TreeNode key={node.drupal_id}
                  label={<StyledNode>
                          <StyledInnerNode>
                            {node.relationships.field_member_picture.localFile !== null &&
                              <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                            {node.title}
                      </StyledInnerNode>
                    </StyledNode>}
                  >
                    {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                      <TreeNode key={node.drupal_id}
                        label={<StyledNode>
                                <StyledInnerNode>
                                  {node.relationships.field_member_picture.localFile !== null &&
                                    <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                                    {node.title}
                            </StyledInnerNode>
                        </StyledNode>}
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
};

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
                childImageSharp {
                  gatsbyImageData(
                    height: 100
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
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

export default PageNodeTemplate;