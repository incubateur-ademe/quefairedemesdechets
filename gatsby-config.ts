import dotenv from "dotenv"

dotenv.config({ path: `.env` });

const config = {
  siteMetadata: {
    title: `Que Faire de mes Déchets ? Découvrez les solutions pour tous vos déchets et nos conseils pour en produire moins.`,
    author: `Datagir`,
    description: `Masque chirurgical ou ffp2, téléphone portable, médicaments, capsules de café, vêtements... Découvrez ici comment les recycler, les trier, les éviter ou les jeter !`,
    siteUrl: `https://quefairedemesdechets.ademe.fr`,
    image: "metaimage.png",
    twitterUsername: "_datagir",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-use-query-params",
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-posthog`,
      options: {
        apiKey: process.env.POSTHOG_API_KEY,
        apiHost: "https://eu.i.posthog.com",
        head: true,
        isEnabledDevMode: false,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Marianne:n3,n5,n7,n8"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "82",
        matomoUrl: "https://stats.beta.gouv.fr",
        siteUrl: "https://quefairedemesdechets.ademe.fr",
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
        icon: "src/images/favicon.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
};


export default config
