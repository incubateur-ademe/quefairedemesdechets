const axios = require(`axios`)

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return axios
    .get(`https://quefairedemesdechets.netlify.app/data/waste.json`)
    .then((res) => res.data.results)
    .then((wasteRes) =>
      axios
        .get('https://quefairedemesdechets.netlify.app/data/links.json')
        .then((res) => res.data.results)
        .then((linkRes) => {
          let tempWaste = [...wasteRes]

          for (let result of wasteRes) {
            if (result['Synonymes_existants']) {
              const synonyms = result['Synonymes_existants'].split(' / ')
              for (let i = 0; i < synonyms.length; i++) {
                tempWaste.push({
                  ...result,
                  Nom: synonyms[i],
                  parent: result['Nom'],
                })
              }
            }
          }
          return tempWaste
            .map((waste) => ({
              ...waste,
              searchable: waste['Nom']
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, ''),

              slug: waste[`Nom`]
                .toLowerCase()
                .replaceAll(' ', '-')
                .replaceAll(`'`, '-')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, ''),
            }))
            .map((product) => ({
              ...product,
              linkRes: linkRes.filter((link) =>
                link['Produits_associÃ©s'].includes(product['Nom'])
              ),
            }))
        })
    )
    .then((res) =>
      res.forEach((product) => {
        createPage({
          path: `/dechet/${product.slug}/`,
          component: require.resolve('./src/templates/product.js'),
          context: { product },
        })
      })
    )
}
