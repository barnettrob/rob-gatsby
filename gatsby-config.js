/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-kleinberg-family.pantheonsite.io/`,
        apiBase: `5ZW3mQML25Cg/api`,
        basicAuth: {
          username: process.env.AUTH_USER,
          password: process.env.AUTH_PASS,
        },
      },
    },
  ],
}
