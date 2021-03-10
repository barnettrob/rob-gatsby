import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import PlaceholderSvg from '../images/placeholder.svg';
import Pagination from "../components/pagination";

class ClimbingListing extends React.Component {
  componentDidMount() {
    const person = {
      "programName": "Web Profile Registration",
      "reason": "Web Profile Registration",
      "source": "Web",
      "lookupField": "email",
      "input": [{
        "eDBUsername": "nickcarraway20210310",
        "email": "nickcarraway20210310@gatsbytesting.com",
        "Company": "EDB Test",
        "Consent_Notes__c": "Ver. May 25, 2018",
        "FirstName": "Nick",
        "LastName": "Carraway",
        "Country": "JM",
        "Industry": "Enterprise",
        "Phone": "334-535-5050"
      }]
    }

    fetch('/.netlify/functions/marketo', {
      method: "POST",
      body: JSON.stringify(person)
    }).then(response => {
      console.log("response", response);
      //return response.json()
    })
  }

  render() {
    const urlPath = 'climbing'
    const { data } = this.props
    const posts = data.allNodeRockClimbing.edges
    const { currentPage } = this.props.pageContext
    const numPages = this.props.pageContext.climbingNumPages

    return (
      <Layout>
        <div className="container">
          <div className="col-md-7">
            {posts.map(({ node}) => (
              <div key={node.drupal_id} className="border-top pb-4">
                <div className="picture">
                  {
                    node.relationships.field_image.localFile === null ?
                    <PlaceholderSvg />
                    :
                    <GatsbyImage image={getImage(node.relationships.field_image.localFile)} alt={node.title} />
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
                  {node.body.summary !== "" ? node.body.summary : node.body.processed.replace( /(<([^>]+)>)/ig, '').substring(0, 300)}
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

export default ClimbingListing

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allNodeRockClimbing(skip: $skip, limit: $limit, sort: {fields: created, order: DESC}, filter: {relationships: {field_image: {localFile: {ext: {ne: ".gif"}}}}}) {
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
    }
  }
`