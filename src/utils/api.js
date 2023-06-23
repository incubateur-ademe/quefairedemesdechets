/*eslint-disable eqeqeq*/

import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import useDebounce from 'hooks/useDebounce'

export function useWaste() {
  return useQuery(
    ['waste'],
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&size=1000&select=Nom%2CSynonymes_existants&sampling=neighbors`
        )
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
export function useSuggestions(suggestions) {
  return useQuery(
    ['suggestions', suggestions],
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&ID_in=${suggestions.join()}&sampling=neighbors&select=Nom`
        )
        .then((res) => res.data.results)
        .then((results) =>
          results.map((result) => ({
            ...result,
            slug: result[`Nom`]
              .toLowerCase()
              .replaceAll(' ', '-')
              .replaceAll(`'`, '-')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          }))
        ),
    {
      enabled: suggestions ? true : false,
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
export function usePlaces(center, zoom, product) {
  const debouncedCenter = useDebounce(center)

  const zoomedEnough = zoom > 10

  const {
    data: decheteries,
    isLoading: isLoadingDecheteries,
    isFetching: isFetchingDecheteries,
  } = useQuery(['decheteries', debouncedCenter], fetchDecheteries, {
    enabled: product['Bdd'] === 'sinoe' && zoomedEnough ? true : false,
    keepPreviousData: product['Bdd'] === 'sinoe' && zoomedEnough ? true : false,
    refetchOnWindowFocus: false,
  })

  const {
    data: pvsoren,
    isLoading: isLoadingPvsoren,
    isFetching: isFetchingPvsoren,
  } = useQuery(['pvsoren', debouncedCenter], fetchPvsoren, {
    enabled: product['Code'] === 'ADEME_SOLAIRE' && zoomedEnough ? true : false,
    keepPreviousData:
      product['Code'] === 'ADEME_SOLAIRE' && zoomedEnough ? true : false,
    refetchOnWindowFocus: false,
  })

  const {
    data: pharmacies,
    isLoading: isLoadingPharmacies,
    isFetching: isFetchingPharmacies,
  } = useQuery(['pharmacies', debouncedCenter], fetchPharmacies, {
    enabled:
      (product['Bdd'] === 'google' || product['Code'] === 'ADEME_DASRI') &&
      zoomedEnough
        ? true
        : false,
    keepPreviousData:
      (product['Bdd'] === 'google' || product['Code'] === 'ADEME_DASRI') &&
      zoomedEnough
        ? true
        : false,
    refetchOnWindowFocus: false,
  })

  const {
    data: ocad3e,
    isLoading: isLoadingOcad3e,
    isFetching: isFetchingOcad3e,
  } = useQuery(['ocad3e', debouncedCenter, product['Code']], fetchOcad3e, {
    enabled: product['Bdd'] === 'ocad3e' && zoomedEnough ? true : false,
    keepPreviousData:
      product['Bdd'] === 'ocad3e' && zoomedEnough ? true : false,
    refetchOnWindowFocus: false,
  })

  return {
    data: [
      ...(decheteries || []),
      ...(pharmacies || []),
      ...(ocad3e || []),
      ...(pvsoren || []),
    ],
    isLoading:
      isLoadingDecheteries ||
      isLoadingPharmacies ||
      isLoadingOcad3e ||
      isLoadingPvsoren,
    isFetching:
      isFetchingDecheteries ||
      isFetchingPharmacies ||
      isFetchingOcad3e ||
      isFetchingPvsoren,
  }
}
const fetchDecheteries = ({ queryKey }) =>
  axios
    .get(
      `https://data.ademe.fr/data-fair/api/v1/datasets/greatersinoe-(r)-annuaire-2017-des-decheteries-de-dechets-menagers-et-assimiles-(dma)/lines?format=json&q_mode=simple&geo_distance=${
        queryKey[1][1]
      }%2C${
        queryKey[1][0]
      }%2C${15000}&size=1000&sampling=neighbors&select=Nom_Déchèterie,Adresse_Déchèterie,Code_postal_Déchèterie,Commune_Déchèterie,_id,_geopoint`
    )
    .then((res) =>
      res.data.results.map((place) => ({
        id: place['_id'],
        latitude: Number(place['_geopoint'].split(',')[0]),
        longitude: Number(place['_geopoint'].split(',')[1]),
        title: place['Nom_Déchèterie'].replaceAll(' ', ' '),
        address: `${place['Adresse_Déchèterie'].replaceAll(' ', ' ')}
                      <br />
                      ${place['Code_postal_Déchèterie']} 
                      ${place['Commune_Déchèterie'].replaceAll(' ', ' ')}`,
      }))
    )
const fetchPvsoren = ({ queryKey }) =>
  axios
    .get(
      `https://data.pointsapport.ademe.fr/data-fair/api/v1/datasets/donnees-de-geolocalisation-des-points-dapport-pv-soren/lines?format=json&q_mode=simple&geo_distance=${
        queryKey[1][1]
      }%2C${queryKey[1][0]}%2C${15000}&size=1000`
    )
    .then((res) =>
      res.data.results.map((place) => ({
        id: place['SIREN'],
        latitude: Number(place['_geopoint'].split(',')[0]),
        longitude: Number(place['_geopoint'].split(',')[1]),
        title: place['Organisme'].replaceAll(' ', ' '),
        address: `${place['Adresse'].replaceAll(' ', ' ')}
                      <br />
                      ${place['Code_Postal']} 
                      ${place['Ville'].replaceAll(' ', ' ')}`,
        hours: formatHoursFromKoumoul(place),
      }))
    )

const fetchPharmacies = ({ queryKey }) =>
  axios
    .get(
      `https://quefairedemesdechets.netlify.app/.netlify/functions/callGMap?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}`
    )
    .then((res) =>
      res.data.results.map((place) => ({
        id: place['place_id'],
        latitude: place['geometry']['location']['lat'],
        longitude: place['geometry']['location']['lng'],
        title: place['name'],
        address: place['vicinity'],
      }))
    )

const fetchOcad3e = ({ queryKey }) =>
  axios
    .get(
      `https://quefairedemesdechets.netlify.app/.netlify/functions/callOcad3e?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}&category=${queryKey[2]}`
    )
    .then((res) =>
      res.data.placemarks
        .map((place) => ({
          id:
            place['name'] +
            place['position']['lat'] +
            place['position']['lng'] +
            String(Math.random()),
          latitude: Number(place['position']['lat']),
          longitude: Number(place['position']['lng']),
          distance: Number(place['position']['distance']),
          title: place['name'],
          hours: place['details']['timeTable'],
          address: `${place['address']['address1']}
                      <br />
                      ${place['address']['postalCode']} 
                      ${place['address']['city']}`,
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1))
    )

export function useRebuildSite() {
  return useMutation(() =>
    axios.post(`https://api.netlify.com/build_hooks/615189df8b8ed42b27ae36d7`)
  )
}

function formatHoursFromKoumoul(place) {
  return `
    Lundi : ${
      place['Ouverture_lundi_AM']
        ? `${place['Ouverture_lundi_AM']} - ${place['Fermeture_lundi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_lundi_PM']
      ? `${place['Ouverture_lundi_PM']} - ${place['Fermeture_lundi_PM']}`
      : 'fermé'
  }<br/>
    mardi : ${
      place['Ouverture_mardi_AM']
        ? `${place['Ouverture_mardi_AM']} - ${place['Fermeture_mardi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_mardi_PM']
      ? `${place['Ouverture_mardi_PM']} - ${place['Fermeture_mardi_PM']}`
      : 'fermé'
  }<br/>
    mercredi : ${
      place['Ouverture_mercredi_AM']
        ? `${place['Ouverture_mercredi_AM']} - ${place['Fermeture_mercredi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_mercredi_PM']
      ? `${place['Ouverture_mercredi_PM']} - ${place['Fermeture_mercredi_PM']}`
      : 'fermé'
  }<br/>
    jeudi : ${
      place['Ouverture_jeudi_AM']
        ? `${place['Ouverture_jeudi_AM']} - ${place['Fermeture_jeudi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_jeudi_PM']
      ? `${place['Ouverture_jeudi_PM']} - ${place['Fermeture_jeudi_PM']}`
      : 'fermé'
  }<br/>
    vendredi : ${
      place['Ouverture_vendredi_AM']
        ? `${place['Ouverture_vendredi_AM']} - ${place['Fermeture_vendredi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_vendredi_PM']
      ? `${place['Ouverture_vendredi_PM']} - ${place['Fermeture_vendredi_PM']}`
      : 'fermé'
  }<br/>
    samedi : ${
      place['Ouverture_samedi_AM']
        ? `${place['Ouverture_samedi_AM']} - ${place['Fermeture_samedi_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_samedi_PM']
      ? `${place['Ouverture_samedi_PM']} - ${place['Fermeture_samedi_PM']}`
      : 'fermé'
  }<br/>
    dimanche : ${
      place['Ouverture_dimanche_AM']
        ? `${place['Ouverture_dimanche_AM']} - ${place['Fermeture_dimanche_AM']}`
        : 'fermé'
    } / ${
    place['Ouverture_dimanche_PM']
      ? `${place['Ouverture_dimanche_PM']} - ${place['Fermeture_dimanche_PM']}`
      : 'fermé'
  }
  `
}
