import React from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'

import useDebounce from 'hooks/useDebounce'
import { useDecheteries, usePharmacies, useOcad3e } from 'utils/api'
import Decheterie from './markers/Decheterie'
import Pharmacie from './markers/Pharmacie'

const StyledMarker = styled(Marker)`
  pointer-events: none;
`
export default function Markers(props) {
  const debouncedViewport = useDebounce(props.viewport)
  const { data: decheteries } = useDecheteries(
    debouncedViewport || {},
    props.product['Déchèterie']
  )
  const { data: pharmacies } = usePharmacies(
    debouncedViewport || {},
    props.product['Pharmacie']
  )
  const { data: oca3de } = useOcad3e(
    debouncedViewport || {},
    props.product['Bdd'] === 'ocad3e',
    props.product['Code']
  )

  return (
    <>
      {decheteries &&
        decheteries
          .sort((a, b) => (props.currentMarker === a['_id'] ? 1 : -1))
          .map((place) => (
            <StyledMarker
              captureClick={true}
              key={place['_id']}
              latitude={Number(place['_geopoint'].split(',')[0])}
              longitude={Number(place['_geopoint'].split(',')[1])}
            >
              <Decheterie
                open={props.currentMarker === place['_id']}
                setCurrentMarker={props.setCurrentMarker}
                place={place}
              />
            </StyledMarker>
          ))}
      {oca3de &&
        oca3de
          .sort((a, b) => (props.currentMarker === a['name'] ? 1 : -1))
          .map((place) => (
            <StyledMarker
              captureClick={true}
              key={place['name']}
              latitude={Number(place['position']['lat'])}
              longitude={Number(place['position']['lng'])}
            >
              OCAD3E
            </StyledMarker>
          ))}
      {pharmacies &&
        pharmacies
          .sort((a, b) => (props.currentMarker === a['id'] ? 1 : -1))
          .map((place) => (
            <StyledMarker
              captureClick={true}
              key={place['id']}
              latitude={Number(place['center'][1])}
              longitude={Number(place['center'][0])}
            >
              <Pharmacie
                open={props.currentMarker === place['id']}
                setCurrentMarker={props.setCurrentMarker}
                place={place}
              />
            </StyledMarker>
          ))}
    </>
  )
}
