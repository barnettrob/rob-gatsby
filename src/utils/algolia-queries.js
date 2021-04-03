const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

const algoliaPageQuery = `{
  family_members: allNodeFamilyMember(
    sort: {fields: title, order: ASC}
    filter: {relationships: {field_member_picture: {localFile: {ext: {ne: ".gif"}}}}}
  ) {
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
        objectID: drupal_internal__nid
        created(formatString: "MMMM DD, YYYY")
        relationships {
          field_member_picture {
            localFile {
              childImageSharp {
                gatsbyImageData(height: 100, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
        field_current_address {
          country_code
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
        title
        path {
          alias
        }
        drupal_internal__nid
        created(formatString: "MMMM DD, YYYY")
        relationships {
          field_member_picture {
            localFile {
              childImageSharp {
                gatsbyImageData(height: 100, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
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
        field_current_address {
          country_code
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
};

const queries = [
  {
    query: algoliaPageQuery,
    transformer: ({ data }) => data.family_members.edges.map(pageToAlgoliaRecord),
    indexName: indexName,
  },
];

module.exports = queries