/*eslint-disable eqeqeq*/

import { useQuery } from 'react-query'
import axios from 'axios'

export function useSearch(search) {
  return useQuery(
    ['search', search],
    () =>
      search.length > 2
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
export function usePosition(position, pathname) {
  return useQuery(
    ['position', position?.timestamp],
    () =>
      axios
        .get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
        )
        .then((res) => res.data),
    {
      enabled: position && pathname === '/' ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
export function useCode(code) {
  return useQuery(
    ['code', code],
    () =>
      axios
        .get(`https://geo.api.gouv.fr/communes?limit=1&fields=nom&code=${code}`)
        .then((res) => res.data),
    {
      enabled: code ? true : false,
      keepPreviousData: code ? false : true,
      refetchOnWindowFocus: false,
    }
  )
}
