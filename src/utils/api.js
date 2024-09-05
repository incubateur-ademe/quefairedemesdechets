/*eslint-disable eqeqeq*/

import { useQuery } from "@tanstack/react-query";
import slug from "slug";
import useDebounce from "hooks/useDebounce";

const LVAO_API = `${process.env.GATSBY_LVAO_BASE_URL}/api`;
export function useLVAOMapForProduct(productID) {
  return useQuery({
    queryKey: ["lvao-product", productID],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(
        `${LVAO_API}/qfdmd/produit?id=${queryKey[1]}`,
      );

      if (!response.ok) {
        throw Error(response.text);
      }
      return response.json();
    },
  });
}

export function useWaste() {
  return useQuery({
    queryKey: ["waste"],
    queryFn: () =>
      fetch(
        `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&size=1000&select=Nom%2CSynonymes_existants&sampling=neighbors`,
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .then((res) => {
          let tempWaste = [...res];

          for (let result of res) {
            if (result["Synonymes_existants"]) {
              const synonyms = result["Synonymes_existants"].split(" / ");
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste["Nom"] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    Nom: synonyms[i],
                    parent: result["Nom"],
                  });
                }
              }
            }
          }

          return tempWaste.map((waste) => ({
            ...waste,
            searchable: waste["Nom"]
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
            slug: slug(waste[`Nom`], { locale: "fr"}),
          }));
        }),
    keepPreviousData: true,
  });
}

export function useSuggestions(suggestions) {
  return useQuery({
    queryKey: ["suggestions", suggestions],
    queryFn: () =>
      fetch(
        `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits/lines?format=json&q_mode=simple&ID_in=${suggestions.join()}&sampling=neighbors&select=Nom`,
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .then((results) =>
          results.map((result) => ({
            ...result,
            slug: slug(result[`Nom`], { locale: "fr" })
          })),
        ),
    enabled: suggestions ? true : false,
    keepPreviousData: true,
  });
}
export function useSearch(search) {
  return useQuery({
    queryKey: ["search", search],
    queryFn: () =>
      search && search.length > 2
        ? fetch(`https://api-adresse.data.gouv.fr/search/?q=${search}`)
            .then((res) => res.json())
            .then((res) => res.features)
        : Promise.resolve([]),
    keepPreviousData: true,
  });
}
export function usePosition(position) {
  return useQuery({
    queryKey: ["position", position?.timestamp],
    queryFn: () =>
      fetch(
        `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`,
      ).then((res) => res.json()),
    enabled: position ? true : false,
  });
}
export function usePlaces(center, zoom, product) {
  const debouncedCenter = useDebounce(center);

  const zoomedEnough = zoom > 10;

  const {
    data: decheteries,
    isLoading: isLoadingDecheteries,
    isFetching: isFetchingDecheteries,
  } = useQuery({
    queryKey: ["decheteries", debouncedCenter],
    queryFn: fetchDecheteries,
    enabled: product["Bdd"] === "sinoe" && zoomedEnough ? true : false,
    keepPreviousData: product["Bdd"] === "sinoe" && zoomedEnough ? true : false,
  });

  const {
    data: pvsoren,
    isLoading: isLoadingPvsoren,
    isFetching: isFetchingPvsoren,
  } = useQuery({
    queryKey: ["pvsoren", debouncedCenter],
    queryFn: fetchPvsoren,
    enabled: product["Code"] === "ADEME_SOLAIRE" && zoomedEnough ? true : false,
    keepPreviousData:
      product["Code"] === "ADEME_SOLAIRE" && zoomedEnough ? true : false,
  });

  const {
    data: pharmacies,
    isLoading: isLoadingPharmacies,
    isFetching: isFetchingPharmacies,
  } = useQuery({
    queryKey: ["pharmacies", debouncedCenter],
    queryFn: fetchPharmacies,
    enabled:
      (product["Bdd"] === "google" || product["Code"] === "ADEME_DASRI") &&
      zoomedEnough
        ? true
        : false,
    keepPreviousData:
      (product["Bdd"] === "google" || product["Code"] === "ADEME_DASRI") &&
      zoomedEnough
        ? true
        : false,
  });

  const {
    data: ocad3e,
    isLoading: isLoadingOcad3e,
    isFetching: isFetchingOcad3e,
  } = useQuery({
    queryKey: ["ocad3e", debouncedCenter, product["Code"]],
    queryFn: fetchOcad3e,
    enabled: product["Bdd"] === "ocad3e" && zoomedEnough ? true : false,
    keepPreviousData:
      product["Bdd"] === "ocad3e" && zoomedEnough ? true : false,
  });

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
  };
}
const fetchDecheteries = ({ queryKey }) =>
  fetch(
    `https://data.ademe.fr/data-fair/api/v1/datasets/sinoe-(r)-annuaire-des-decheteries-dma/lines?format=json&q_mode=simple&q=${2024}&q_fields=ANNEE&geo_distance=${
      queryKey[1][1]
    }%2C${
      queryKey[1][0]
    }%2C${15000}&size=1000&sampling=neighbors&select=ANNEE%2CN_SERVICE%2CAD1_SITE%2CCP_SITE%2CL_VILLE_SITE%2C_geopoint%2C_id`,
  ).then((res) =>
    res.json().results.map((place) => ({
      id: place["_id"],
      latitude: Number(place["_geopoint"].split(",")[0]),
      longitude: Number(place["_geopoint"].split(",")[1]),
      title: place["N_SERVICE"].replaceAll(" ", " "),
      address: `${place["AD1_SITE"].replaceAll(" ", " ")}
                      <br />
                      ${place["CP_SITE"]}
                      ${place["L_VILLE_SITE"].replaceAll(" ", " ")}`,
    })),
  );
const fetchPvsoren = ({ queryKey }) =>
  fetch(
    `https://data.pointsapport.ademe.fr/data-fair/api/v1/datasets/donnees-de-geolocalisation-des-points-dapport-pv-soren/lines?format=json&q_mode=simple&geo_distance=${
      queryKey[1][1]
    }%2C${queryKey[1][0]}%2C${15000}&size=1000`,
  )
    .then((res) => res.json())
    .then((res) =>
      res.results.map((place) => ({
        id: place["SIREN"],
        latitude: Number(place["_geopoint"].split(",")[0]),
        longitude: Number(place["_geopoint"].split(",")[1]),
        title: place["Organisme"].replaceAll(" ", " "),
        address: `${place["Adresse"].replaceAll(" ", " ")}
                      <br />
                      ${place["Code_Postal"]}
                      ${place["Ville"].replaceAll(" ", " ")}`,
        hours: formatHoursFromKoumoul(place),
      })),
    );

const fetchPharmacies = ({ queryKey }) =>
  fetch(
    `https://quefairedemesdechets.netlify.app/.netlify/functions/callGMap?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}`,
  )
    .then((res) => res.json())
    .then((res) =>
      res.results.map((place) => ({
        id: place["place_id"],
        latitude: place["geometry"]["location"]["lat"],
        longitude: place["geometry"]["location"]["lng"],
        title: place["name"],
        address: place["vicinity"],
      })),
    );

const fetchOcad3e = ({ queryKey }) =>
  fetch(
    `https://quefairedemesdechets.netlify.app/.netlify/functions/callOcad3e?latitude=${queryKey[1][0]}&longitude=${queryKey[1][1]}&category=${queryKey[2]}`,
  )
    .then((res) => res.json())
    .then((res) =>
      res.placemarks
        .map((place) => ({
          id:
            place["name"] +
            place["position"]["lat"] +
            place["position"]["lng"] +
            String(Math.random()),
          latitude: Number(place["position"]["lat"]),
          longitude: Number(place["position"]["lng"]),
          distance: Number(place["position"]["distance"]),
          title: place["name"],
          hours: place["details"]["timeTable"],
          address: `${place["address"]["address1"]}
                      <br />
                      ${place["address"]["postalCode"]}
                      ${place["address"]["city"]}`,
        }))
        .sort((a, b) => (a.distance > b.distance ? 1 : -1)),
    );

function formatHoursFromKoumoul(place) {
  return `
    Lundi : ${
      place["Ouverture_lundi_AM"]
        ? `${place["Ouverture_lundi_AM"]} - ${place["Fermeture_lundi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_lundi_PM"]
        ? `${place["Ouverture_lundi_PM"]} - ${place["Fermeture_lundi_PM"]}`
        : "fermé"
    }<br/>
    mardi : ${
      place["Ouverture_mardi_AM"]
        ? `${place["Ouverture_mardi_AM"]} - ${place["Fermeture_mardi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_mardi_PM"]
        ? `${place["Ouverture_mardi_PM"]} - ${place["Fermeture_mardi_PM"]}`
        : "fermé"
    }<br/>
    mercredi : ${
      place["Ouverture_mercredi_AM"]
        ? `${place["Ouverture_mercredi_AM"]} - ${place["Fermeture_mercredi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_mercredi_PM"]
        ? `${place["Ouverture_mercredi_PM"]} - ${place["Fermeture_mercredi_PM"]}`
        : "fermé"
    }<br/>
    jeudi : ${
      place["Ouverture_jeudi_AM"]
        ? `${place["Ouverture_jeudi_AM"]} - ${place["Fermeture_jeudi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_jeudi_PM"]
        ? `${place["Ouverture_jeudi_PM"]} - ${place["Fermeture_jeudi_PM"]}`
        : "fermé"
    }<br/>
    vendredi : ${
      place["Ouverture_vendredi_AM"]
        ? `${place["Ouverture_vendredi_AM"]} - ${place["Fermeture_vendredi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_vendredi_PM"]
        ? `${place["Ouverture_vendredi_PM"]} - ${place["Fermeture_vendredi_PM"]}`
        : "fermé"
    }<br/>
    samedi : ${
      place["Ouverture_samedi_AM"]
        ? `${place["Ouverture_samedi_AM"]} - ${place["Fermeture_samedi_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_samedi_PM"]
        ? `${place["Ouverture_samedi_PM"]} - ${place["Fermeture_samedi_PM"]}`
        : "fermé"
    }<br/>
    dimanche : ${
      place["Ouverture_dimanche_AM"]
        ? `${place["Ouverture_dimanche_AM"]} - ${place["Fermeture_dimanche_AM"]}`
        : "fermé"
    } / ${
      place["Ouverture_dimanche_PM"]
        ? `${place["Ouverture_dimanche_PM"]} - ${place["Fermeture_dimanche_PM"]}`
        : "fermé"
    }
  `;
}
