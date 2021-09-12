/*eslint-disable eqeqeq*/

import { useQuery } from 'react-query'
import axios from 'axios'

export function useWaste() {
  return useQuery(
    ['waste'],
    () =>
      axios
        .get(`/data/waste-search.json`)
        .then((res) => res.data.results)

        .then((res) => {
          let tempWaste = [...res]

          for (let result of res) {
            if (result['Synonymes_existants']) {
              const synonyms = result['Synonymes_existants'].split(' / ')
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste['Nom'] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    Nom: synonyms[i],
                    parent: result['Nom'],
                  })
                }
              }
            }
          }

          return tempWaste.map((waste) => ({
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
        }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function useSearch(search) {
  return useQuery(
    ['search', search],
    () =>
      search && search.length > 2
        ? axios
            .get(
              `https://api-adresse.data.gouv.fr/search/?q=${search}&type=housenumber`
            )
            .then((res) => res.data.features)
        : Promise.resolve([]),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
export function usePosition(position) {
  return useQuery(
    ['position', position?.timestamp],
    () =>
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        )
        .then((res) => res.data),
    {
      enabled: position ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
export function useDecheteries(viewport, enabled) {
  return useQuery(
    ['decheterie', viewport],
    () =>
      axios
        .get(
          `https://koumoul.com/s/data-fair/api/v1/datasets/greatersinoe-(r)-annuaire-2017-des-decheteries-de-dechets-menagers-et-assimiles-(dma)/lines?format=json&q_mode=simple&geo_distance=${
            viewport.longitude
          }%2C${viewport.latitude}%2C${
            viewport.zoom > 10 ? 10000 : 15000
          }&size=1000&sampling=neighbors&select=Nom_Déchèterie,Adresse_Déchèterie,Code_postal_Déchèterie,Commune_Déchèterie,_id,_geopoint`
        )
        .then((res) => res.data.results),
    {
      enabled: enabled && viewport.zoom > 8.5 ? true : false,
      keepPreviousData: viewport.zoom > 8.5 ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
export function usePharmacies(viewport, enabled) {
  return useQuery(
    ['pharmacies', viewport],
    () =>
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/pharmacie.json?proximity=${viewport.longitude},${viewport.latitude}&language=fr&access_token=${process.env.GATSBY_MAPBOX_API_TOKEN}&limit=10`
        )
        .then((res) => res.data.features),
    {
      enabled: enabled && viewport.zoom > 8.5 ? true : false,
      keepPreviousData: viewport.zoom > 8.5 ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
