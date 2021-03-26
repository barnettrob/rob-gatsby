import React from "react";
import { Link, graphql } from "gatsby";
import { isAuthenticated, login } from "../utils/auth";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PlaceholderSvg from '../images/placeholder.svg';
import Pagination from "../components/pagination";

class familyMemberListing extends React.Component {
  render() {
    const urlPath = 'family/members'
    const { data } = this.props
    const posts = data.allNodeFamilyMember.edges
    const { currentPage } = this.props.pageContext
    const numPages = this.props.pageContext.familyNumPages

    if (!isAuthenticated()) {
      login()
      return <div className="container mt-5">Redirecting to login...</div>
    }

    return (
      <Layout>
        <div className="container mt-5">
          <div className="col-md-7">
            {posts.map(({ node}) => (
              <div key={node.drupal_id} className="border-top pb-4">
                <div className="picture">
                  {
                    node.relationships.field_member_picture.localFile === null ?
                    <PlaceholderSvg />
                    :
                    <GatsbyImage image={getImage(node.relationships.field_member_picture.localFile)} alt={node.title} />
                  }
                </div>
                <h4 className="m-0">
                  <Link
                    to={node.path.alias}
                    className=""
                    >
                    {node.title}
                  </Link>
                </h4>
                <p className="mb-1 text-muted small">
                  {
                    node.body !== null ? 
                      node.body.summary !== "" ? node.body.summary : node.body.processed.replace( /(<([^>]+)>)/ig, '').substring(0, 300)
                    :
                    ''
                  }
                </p>
              </div>
            ))}
            <Pagination 
              urlPath={urlPath} 
              numPages={numPages}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default familyMemberListing

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNodeFamilyMember(skip: $skip, limit: $limit, sort: {fields: title, order: ASC}, filter: {relationships: {field_member_picture: {localFile: {ext: {ne: ".gif"}}}}}) {
      edges {
        node {
          body {
            summary
            processed
          }
          title
          path {
            alias
          }
          drupal_id
          created(formatString: "MMMM DD, YYYY")
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
          }
        }
      }
    }
  }
`