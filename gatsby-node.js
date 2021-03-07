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
  const musicTemplate = path.resolve(`src/templates/music.js`)
  const musicListingTemplate = path.resolve(`src/templates/music-listing.js`)
  const rockClimbingTemplate = path.resolve(`src/templates/rock-climbing.js`)
  const rockClimbingListingTemplate = path.resolve(`src/templates/rock-climbing-listing.js`)

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
      music: allNodeMusic(filter: {status: {eq: true}}) {
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
      climbing: allNodeRockClimbing(filter: {status: {eq: true}}) {
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
      music_list: allNodeMusic(
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
      climbing_list: allNodeRockClimbing(
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
    // Create pages for each music page.
    result.data.music.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: musicTemplate,
        context: {
          alias: node.path.alias != null ? node.path.alias : `/node/${node.drupal_internal__nid}`,
        }
      })
    });
    // Create pages for each climbing page.
    result.data.climbing.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: rockClimbingTemplate,
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
    // Create list pages for music
    const musicPosts = result.data.music_list.edges
    const musicPostsPerPage = 10
    const musicNumPages = Math.ceil(musicPosts.length / musicPostsPerPage)
    Array.from({ length: musicNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/music` : `/music/${i + 1}`,
        component: musicListingTemplate,
        context: {
          limit: musicPostsPerPage,
          skip: i * musicPostsPerPage,
          musicNumPages,
          currentPage: i + 1,
        }
      })
    });
    // Create list pages for rock climbing
    const climbingPosts = result.data.climbing_list.edges
    const climbingPostsPerPage = 10
    const climbingNumPages = Math.ceil(climbingPosts.length / climbingPostsPerPage)
    Array.from({ length: climbingNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/climbing` : `/climbing/${i + 1}`,
        component: rockClimbingListingTemplate,
        context: {
          limit: climbingPostsPerPage,
          skip: i * climbingPostsPerPage,
          climbingNumPages,
          currentPage: i + 1,
        }
      })
    });    
  })
}