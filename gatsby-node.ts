import path from "path";
import slug from "slug";

// Duplicated from src/utils/api.js
type ProductFromAdeme = {
  slug: string;
};
function getSlugFrom(productFromAdemeAPI: ProductFromAdeme) {
  return slug(productFromAdemeAPI[`slug`], { locale: "fr" });
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return fetch(
    `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&size=1000&sampling=neighbors`,
  )
    .then((res) => res.json())
    .then((res) =>
      res.results.filter((waste) => typeof waste["ID"] !== "undefined"),
    ) // handle Koumoul missing ID
    .then((wasteRes) =>
      fetch(
        "https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-liens/lines?format=json&q_mode=simple&size=1000&sampling=neighbors",
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .then((linkRes) => {
          let tempWaste = [...wasteRes];

          for (let result of wasteRes) {
            if (result["Synonymes_existants"]) {
              const synonyms = result["Synonymes_existants"].split(" / ");
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste["Nom"] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    ID: result["ID"] + "_" + i,
                    Nom: synonyms[i],
                    parent: result["Nom"],
                  });
                }
              }
            }
          }
          return tempWaste.map((waste) => ({
            ...waste,
            slug: getSlugFrom(waste),
            map:
              waste["Bdd"] === "sinoe" ||
              waste["Bdd"] === "google" ||
              waste["Bdd"] === "ocad3e" ||
              waste["Code"] === "ADEME_DASRI" ||
              waste["Code"] === "ADEME_SOLAIRE",
            links: linkRes.filter((link) =>
              link["Produits_associes"]
                .split("; ")
                .includes(waste["ID"].split("_")[0]),
            ),
          }));
        }),
    )
    .then((res) =>
      res.forEach((product) => {
        createPage({
          path: `/dechet/${product.slug}/`,
          component: path.resolve("./src/templates/product.js"),
          context: { product },
        });
      }),
    );
};
