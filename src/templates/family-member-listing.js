import React from "react";
import { Link, graphql } from "gatsby";
import { isAuthenticated, login } from "../utils/auth";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Pagination from "../components/pagination";
import DescendentFilter from "../components/family-descendent-filter";

class familyMemberListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checkboxesObj: {},
    };

    this.handleCheckboxesChange = this.handleCheckboxesChange.bind(this);    
  }

  handleCheckboxesChange(i) {
    this.setState({
      checkboxesObj: {
        ...this.state.checkboxesObj, ...{[i]: !this.state.checkboxesObj[i]}
      }
    })
  }

  render() {
    const urlPath = 'family/members'
    const { data } = this.props
    const posts = data.allNodeFamilyMember.edges
    const { currentPage } = this.props.pageContext
    const numPages = this.props.pageContext.familyNumPages
    const filterDescendents = data.descendent.edges

    if (!isAuthenticated()) {
      login()
      return <div className="container mt-5">Redirecting to login...</div>
    }

    return (
      <Layout>
        <div className="container d-flex mt-5">
          <div className="col-md-3 text-sm-left">
            <h4>Filters</h4>
            <h6 className="mt-4 mb-2 text-uppercase text-muted">
              Descended from
            </h6>
            {filterDescendents.map(function(node) {
                let filterData = {
                  label: node.node.title,
                  nid: node.node.drupal_internal__nid,
                  name: "filter-descendent",
                }
                return <DescendentFilter 
                          filter={filterData} 
                          key={node.node.drupal_internal__nid}
                          checked={this.state.checkboxesObj[node.node.drupal_internal__nid] || false}
                          onChange={() => this.handleCheckboxesChange(node.node.drupal_internal__nid)}
                          value={filterData.nid}
                        />
              }, this)
            }
          </div>
          <div className="col-md-9 pr-lg-5">
            {posts.filter(function (record) {
              let descendentsArray = [];
              const descendents = record.node.relationships.field_original_descendent;
              for (let key in descendents) {
                if (descendents.hasOwnProperty(key)) {
                  descendentsArray.push(descendents.drupal_internal__nid);
                }
              }
              // Logic for all unchecked filter boxes for filtering out records.
              let checkboxesAllFalse = true;

              for (let i in this.state.checkboxesObj) {
                if (this.state.checkboxesObj[i] === true) {
                  checkboxesAllFalse = false;
                  break;
                }
              }
              // // Return all entries based on not null title if nothing checked
              // // or if all values in checkboxesObj are false.
              if (Object.entries(this.state.checkboxesObj).length === 0 || checkboxesAllFalse) {
                return record.node.title !== null;
              }
              else {
                let filterStateChecks = [];
                for (let nid in this.state.checkboxesObj) {
                  if (this.state.checkboxesObj[nid] === true) {
                    // Convert nid to integer to be comparable to record nid values.
                    filterStateChecks.push(parseInt(nid));
                  }
                  else {
                    if (filterStateChecks.length > 0) {
                      filterStateChecks.slice(nid);
                    }
                    else {
                      filterStateChecks = [];
                    }
                  }
                }
                // Filter by filter state: nid included.
                return descendentsArray.some(item => filterStateChecks.includes(item));
              }         
            }, this).map(({ node }) => (
              <div key={node.drupal_id} className="border-top pt-2 pb-4">
                <div className="picture">
                  {
                    node.relationships.field_member_picture !== null && 
                    node.relationships.field_member_picture.localFile !== null &&
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
                {node.relationships.field_descendent_parent !== null && node.relationships.field_descendent_parent.title !== null &&
                <div className="mb-1 text-muted small">
                  Parent: {node.relationships.field_descendent_parent.title}
                </div>}
                {node.relationships.field_original_descendent !== null &&
                <div className="font-italic font-weight-light small text-muted">
                  Original Descendent: {node.relationships.field_original_descendent.title}
                </div>}
              </div>
            ))}
            {numPages > 1 &&
            <Pagination 
              urlPath={urlPath} 
              numPages={numPages}
              currentPage={currentPage}
            />}
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
            field_descendent_parent {
              title
              path {
                alias
              }             
            }
            field_original_descendent {
              title
              path {
                alias
              }
              drupal_internal__nid
            }
          }
        }
      }
    }
    descendent: allNodeFamilyMember(
      filter: {relationships: {field_original_descendent: {drupal_internal__nid: {eq: null}}}}
      sort: {fields: title, order: ASC}
    ) {
      edges {
        node {
          relationships {
            field_original_descendent {
              title
            }
          }
          title
          drupal_internal__nid
        }
      }
    }
  }
`