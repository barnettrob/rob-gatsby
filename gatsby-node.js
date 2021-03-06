/**
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions, graphql }) => {
  const {createPage} = actions;

  const pageTemplate = path.resolve(`src/templates/page-drupal.js`)
  const spaceTemplate = path.resolve(`src/templates/space.js`)
  const spaceListingTemplate = path.resolve(`src/templates/space-listing.js`)

  // Query for recipe nodes to use in creating pages.
  return graphql(`
    {
      space_pages: allNodeSpaceExploration(filter: {status: {eq: true}}) {
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
      space_list_pages: allNodeSpaceExploration(
        limit: 1000
        sort: {fields: changed, order: DESC}
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
    // Create pages for each space page.
    result.data.space_pages.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: spaceTemplate,
        context: {
          alias: node.path.alias != null ? node.path.alias : `/node/${node.drupal_internal__nid}`,
        }
      })
    });
    // Create list pages for space
    const spacePosts = result.data.space_list_pages.edges
    const spacePostsPerPage = 10
    const spaceNumPages = Math.ceil(spacePosts.length / spacePostsPerPage)
    Array.from({ length: spaceNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/space` : `/space/${i + 1}`,
        component: spaceListingTemplate,
        context: {
          limit: spacePostsPerPage,
          skip: i * spacePostsPerPage,
          spaceNumPages,
          currentPage: i + 1,
        }
      })
    });
  })
}