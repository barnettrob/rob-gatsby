import React from 'react';
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { login, isAuthenticated } from "../utils/auth";
import Layout from "../components/layout";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import MemberDetailModal from "../components/family-member-modal";
//import { sanitizeHtml } from "../utilities";

class familyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      activeItem: ''
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleShow = (item) => {
    this.setState({activeItem:item}, ()=> this.setState({ show: true }));
  };

  handleClose = (item) => {
  this.setState({activeItem:item}, ()=> this.setState({ show: false }));
  };

  render() {
    const { data } = this.props
    const posts = data.all_family.edges
    const StyledNode = styled.div`
    padding: 10px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid #3aa88e;
    position: relative;
    width: 110px;
    `;

    const StyledInnerNode = styled.div`
    margin: 0 auto;
    postion: relative;
    `;

    if (!isAuthenticated()) {
      login()
      return <div className="container mt-5">Redirecting to login...</div>
    }

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
                        <Link to="#" onClick={() => this.handleShow(node)}>
                        {node.relationships.field_member_picture !== null && 
                          node.relationships.field_member_picture.localFile !== null &&
                            <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                            {node.title}
                        </Link>
                        <MemberDetailModal 
                          show={this.state.show}
                          details={this.state.activeItem}
                          onHide={() => this.handleClose(node)}
                        />
                      </StyledInnerNode>
                </StyledNode>}
            >
              {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                <TreeNode key={node.drupal_id}
                  label={<StyledNode>
                          <StyledInnerNode>
                            <Link to="#" onClick={() => this.handleShow(node)}>
                              {node.relationships.field_member_picture !== null && 
                                node.relationships.field_member_picture.localFile !== null &&
                                <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                              {node.title}
                            </Link>
                            <MemberDetailModal 
                              show={this.state.show}
                              details={this.state.activeItem}
                              onHide={() => this.handleClose(node)}
                            />                            
                      </StyledInnerNode>
                    </StyledNode>}
                  >
                    {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                      <TreeNode key={node.drupal_id}
                        label={<StyledNode>
                                <StyledInnerNode>
                                  <Link to="#" onClick={() => this.handleShow(node)}>
                                    {node.relationships.field_member_picture !== null && 
                                      node.relationships.field_member_picture.localFile !== null &&
                                      <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                                      {node.title}
                                  </Link>
                                  <MemberDetailModal 
                                    show={this.state.show}
                                    details={this.state.activeItem}
                                    onHide={() => this.handleClose(node)}
                                  />                                    
                            </StyledInnerNode>
                        </StyledNode>}
                      >
                    {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                        <TreeNode key={node.drupal_id}
                          label={<StyledNode>
                                  <StyledInnerNode>
                                    <Link to="#" onClick={() => this.handleShow(node)}>
                                      {node.relationships.field_member_picture !== null && 
                                        node.relationships.field_member_picture.localFile !== null &&
                                        <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                                        {node.title}
                                    </Link>
                                    <MemberDetailModal 
                                      show={this.state.show}
                                      details={this.state.activeItem}
                                      onHide={() => this.handleClose(node)}
                                    />                                    
                              </StyledInnerNode>
                          </StyledNode>}
                        >
                        {posts.filter(child => child.node.relationships.field_descendent_parent !== null && child.node.relationships.field_descendent_parent.title === node.title).map(({ node }) => (
                          <TreeNode key={node.drupal_id}
                            label={<StyledNode>
                                    <StyledInnerNode>
                                      <Link to="#" onClick={() => this.handleShow(node)}>
                                        {node.relationships.field_member_picture !== null && 
                                          node.relationships.field_member_picture.localFile !== null &&
                                          <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />}
                                          {node.title}
                                      </Link>
                                      <MemberDetailModal 
                                        show={this.state.show}
                                        details={this.state.activeItem}
                                        onHide={() => this.handleClose(node)}
                                      />                                    
                                </StyledInnerNode>
                            </StyledNode>}
                          >
                          </TreeNode>
                        ))} 
                        </TreeNode>
                      ))}                        
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
}

export default familyTree

export const pageQuery = graphql`
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
                    height: 500
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            field_descendent_parent {
              title
              path {
                alias
              }
            }
          }
          field_partner
          field_phone_number
          body {
            processed
          }
          field_born {
            administrative_area
            country_code
            locality
          }
          field_current_address {
            address_line1
            address_line2
            administrative_area
            country_code
            postal_code
            locality
          }
        }
      }
    }
  }
`