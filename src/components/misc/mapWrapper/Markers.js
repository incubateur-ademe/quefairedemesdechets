import React from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'

import useDebounce from 'hooks/useDebounce'
import { useDecheteries } from 'utils/api'
import Decheterie from './markers/Decheterie'

const StyledMarker = styled(Marker)`
  pointer-events: none;
`
export default function Markers(props) {
  const debouncedViewport = useDebounce(props.viewport)
  const { data: decheteries } = useDecheteries(
    debouncedViewport || {},
    props.product && props.product['Déchèterie']
  )

  return (
    <>
      {decheteries &&
        decheteries
          .sort((a, b) => (props.currentMarker === a['_id'] ? 1 : -1))
          .map((decheterie) => (
            <StyledMarker
              captureClick={true}
              key={decheterie['_id']}
              latitude={Number(decheterie['_geopoint'].split(',')[0])}
              longitude={Number(decheterie['_geopoint'].split(',')[1])}
            >
              <Decheterie
                open={props.currentMarker === decheterie['_id']}
                setCurrentMarker={props.setCurrentMarker}
                decheterie={decheterie}
              />
            </StyledMarker>
          ))}
    </>
  )
}
