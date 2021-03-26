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
          alias: node.path.alias != null ? node.path.alias : `/family/node/${node.drupal_internal__nid}`,
        }
      })
    });
    // Create list pages for family members.
    const familyPosts = result.data.family_list.edges
    const familyPostsPerPage = 3
    const familyNumPages = Math.ceil(familyPosts.length / familyPostsPerPage)
    Array.from({ length: familyNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/family/members` : `/family/members/${i + 1}`,
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

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/family/)) {
    page.matchPath = "/family/*"

    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}