import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

import Address from './mapWrapper/Address'

export default function MapWrapper(props) {
  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 2,
    zoom: 4,
  })

  return (
    <>
      <Address setViewport={setViewport} />
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle={'mapbox://styles/florianpanchout/cko9uoaxw1n2718qkb6zktjjf'}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      />
    </>
  )
}
