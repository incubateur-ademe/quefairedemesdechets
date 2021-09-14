import React from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'

import useDebounce from 'hooks/useDebounce'
import { useDecheteries, usePharmacies, useOcad3e } from 'utils/api'
import Place from './markers/Place'

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
      {[...(decheteries || []), ...(pharmacies || []), ...(oca3de || [])]
        .sort((a, b) => (props.currentMarker === a['id'] ? 1 : -1))
        .map(
          (place) =>
            place.latitude &&
            place.longitude && (
              <StyledMarker
                captureClick={true}
                key={place.id}
                latitude={place.latitude}
                longitude={place.longitude}
              >
                <Place
                  place={place}
                  open={props.currentMarker === place.id}
                  setCurrentMarker={props.setCurrentMarker}
                />
              </StyledMarker>
            )
        )}
    </>
  )
}
