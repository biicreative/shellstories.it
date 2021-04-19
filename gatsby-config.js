const siteUrl = "https://shellstories.it"

module.exports = {
  siteMetadata: {
    title: `Shell Stories`,
    author: {
      name: `Biicreative`,
    },
    description: `A rich cabinet of wonders revealing unexpected connections`,
    siteUrl: siteUrl,
    social: {
      twitter: `biicreative`,
      medium: `medium.shellstories.it`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 480,
              showCaptions: true,
              markdownCaptions: true,
              wrapperStyle: "text-align:center;",
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Shell Stories`,
        short_name: `Shell Stories`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/profile-pic.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-json-output`,
      options: {
        siteUrl: siteUrl, // defined on top of plugins
        graphQLQuery: `
          {
            allMarkdownRemark(
              limit: 1000
              sort: { fields: [frontmatter___token], order: ASC }
              filter: { frontmatter: { nft: { eq: true } } }
            ) {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  nft_title
                  nft_url
                  date
                  token
                }
              }
            }
          }
        `,
        serialize: results =>
          results.data.allMarkdownRemark.nodes.map(node => ({
            path: node.fields.slug, // MUST contain a path
            token: node.frontmatter.token,
            name: node.frontmatter.nft_title,
            url: node.frontmatter.nft_url,
            created: node.frontmatter.date,
          })),
      },
    },
  ],
}
