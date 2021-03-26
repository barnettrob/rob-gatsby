/**
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions, graphql }) => {
  const {createPage} = actions;

  const pageTemplate = path.resolve(`src/templates/page-drupal.js`)
  const familyMemberTemplate = path.resolve(`src/templates/family-member.js`)
  const familyMemberListingTemplate = path.resolve(`src/templates/family-member-listing.js`)

  // Query for recipe nodes to use in creating pages.
  return graphql(`
    {
      page: allNodePage(filter: {status: {eq: true}}) {
        edges {
          node {
            title
            path {
              alias
            }
            drupal_internal__nid
          }
        }
      }
      family_member: allNodeFamilyMember(filter: {status: {eq: true}}) {
        edges {
          node {
            title
            path {
              alias
            }
            drupal_internal__nid
          }
        }
      }
      family_list: allNodeFamilyMember(
        limit: 1000
        sort: {fields: title, order: ASC}
      ) {
        edges {
          node {
            title
            path {
              alias
            }
            drupal_id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create pages for each article.
    result.data.page.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: pageTemplate,
        context: {
          alias: node.path.alias != null ? node.path.alias : `/node/${node.drupal_internal__nid}`,
        }
      })
    });    
    // Create pages for each family member page.
    result.data.family_member.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: familyMemberTemplate,
        context: {
          alias: node.path.alias != null ? node.path.alias : `/node/${node.drupal_internal__nid}`,
        }
      })
    });
    // Create list pages for family members.
    const familyPosts = result.data.family_list.edges
    const familyPostsPerPage = 3
    const familyNumPages = Math.ceil(familyPosts.length / familyPostsPerPage)
    Array.from({ length: familyNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/family` : `/family/${i + 1}`,
        component: familyMemberListingTemplate,
        context: {
          limit: familyPostsPerPage,
          skip: i * familyPostsPerPage,
          familyNumPages,
          currentPage: i + 1,
        }
      })
    });    
  })
}