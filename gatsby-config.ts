import dotenv from "dotenv";
dotenv.config({ path: `.env` });

import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  headers: [
    {
      source: "*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "frame-ancestors *;",
        },
      ],
    },
  ],
  siteMetadata: {
    title: `Que Faire de mes déchets & objets : votre assistant au tri et à la réduction des déchets`,
    author: `LongueVieAuxObjets`,
    description: `Vêtements, emballages, smartphones, médicaments… trouvez les réponses pour les réparer, les revendre d'occasion, les trier, les recycler, les éviter ou les jeter`,
    siteUrl: `https://quefairedemesdechets.ademe.fr`,
    image: "metaimage.png",
    twitterUsername: "ademe",
  },
  plugins: [
    `gatsby-plugin-sitemap`,
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
        initOptions: {
          persistence: "memory",
        },
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
        disableCookies: true
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

export default config;
