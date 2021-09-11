module.exports = {
  siteMetadata: {
    title: `Que Faire de mes Déchets`,
    author: `Datagir`,
    description: `Découvrez les solutions pour tous vos déchets et nos conseils pour en produire moins.`,
    siteUrl: `https://quefairedemesdechets.fr`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`limelight`, `poppins\:500,800`],
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '128',
        matomoUrl: 'https://stats.data.gouv.fr',
        siteUrl: 'https://quefairedemesdechets.fr',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Que Faire de mes Déchets`,
        short_name: `QFDMD`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e42313`,
        display: `minimal-ui`,
        icons: [
          {
            src: 'icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
}
