import React, { useState } from 'react'
import styled from 'styled-components'

import ReactMapGL from 'react-map-gl'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  padding-top: 0.125rem;
  border-top: 0.125rem solid ${(props) => props.theme.colors.text};
`
const Alert = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 2rem;
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 2rem;
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
      <Alert>Prochainement sur vos écrans</Alert>
    </Wrapper>
  ) : null
}
