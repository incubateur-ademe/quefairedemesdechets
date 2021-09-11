import React, { useState } from 'react'
import styled from 'styled-components'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'

import Address from './mapWrapper/Address'
import Markers from './mapWrapper/Markers'

const Cache = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity 600ms;
`
export default function MapWrapper(props) {
  const [viewport, setViewport] = useState({
    label: '',
    latitude: 47.5,
    longitude: 2,
    zoom: 4.5,
  })

  const [currentMarker, setCurrentMarker] = useState(null)
  return (
    <>
      <Address viewport={viewport} setViewport={setViewport} />
      <Cache visible={!viewport.label} />
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapStyle={'mapbox://styles/florianpanchout/ckrnnxugq0yua17lmpm1ddn9d'}
        onViewportChange={(newViewport) => {
          setViewport({
            ...viewport,
            ...newViewport,
            // label: newViewport.zoom > 8 ? viewport.label : '',
          })
        }}
        onInteractionStateChange={(interactionState) =>
          interactionState.isDragging && setCurrentMarker(null)
        }
        onNativeClick={() => setCurrentMarker(null)}
        mapboxApiAccessToken={process.env.GATSBY_MAPBOX_API_TOKEN}
      >
        <Markers
          product={props.product}
          viewport={viewport}
          currentMarker={currentMarker}
          setCurrentMarker={({ id, latitude, longitude }) => {
            setViewport({
              ...viewport,
              latitude,
              longitude,
              transitionDuration: 300,
              transitionInterpolator: new FlyToInterpolator(),
            })

            setCurrentMarker(id)
          }}
        />
      </ReactMapGL>
    </>
  )
}
