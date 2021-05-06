import React, { useState } from 'react'
import styled from 'styled-components'

import ReactMapGL from 'react-map-gl'

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  margin-top: 0.125rem;
`
export default function Map(props) {
  const [viewport, setViewport] = useState({
    latitude: 48.8159,
    longitude: 2.3061,
    zoom: 9,
  })

  return props.open ? (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle={'mapbox://styles/florianpanchout/cko9uoaxw1n2718qkb6zktjjf'}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      />
    </Wrapper>
  ) : null
}
