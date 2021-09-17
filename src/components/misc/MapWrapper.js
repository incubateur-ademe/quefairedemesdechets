import React, { useState, useContext } from 'react'
import styled, { keyframes, ThemeContext } from 'styled-components'
import { Map, Marker, Overlay } from 'pigeon-maps'

import { usePlaces } from 'utils/api'
import Address from './mapWrapper/Address'
import Place from './mapWrapper/Place'

const fetching = keyframes`
  from {
    transform: scaleX(1);
    transform-origin: right;
  }

  49.9% {
    transform: scaleX(0);
    transform-origin: right;
  }
  50% {
    transform: scaleX(0);
    transform-origin: left;
  }

  to {
    transform: scaleX(1);
    transform-origin: left;
  }
`
const Cache = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity 600ms;
`
const Loader = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 0.125rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};

  ${(props) => props.theme.mq.small} {
    bottom: auto;
    top: 0;
    height: 0.5rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.text};
    opacity: 0.2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.text};
    animation: ${(props) => (props.isFetching ? fetching : 'none')} 1s linear
      infinite;
  }
`
export default function MapWrapper(props) {
  const [address, setAddress] = useState('')
  const [center, setCenter] = useState([47.5, 2])
  const [zoom, setZoom] = useState(4.5)

  const [currentPlace, setCurrentPlace] = useState(null)

  const { data, isLoading, isFetching } = usePlaces(center, zoom, props.product)

  const themeContext = useContext(ThemeContext)

  return (
    <>
      <Address
        address={address}
        setAddress={setAddress}
        setCenter={setCenter}
        setZoom={setZoom}
      />
      <Loader isFetching={isFetching} />
      <Cache visible={!address} />
      <Map
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center)
          setZoom(zoom)
        }}
        attribution={false}
      >
        {data &&
          data.map(
            (place) =>
              place.latitude &&
              place.longitude && (
                <Marker
                  key={place.id}
                  width={50}
                  color={themeContext.colors.main}
                  anchor={[place.latitude, place.longitude]}
                  onClick={() => setCurrentPlace(place)}
                />
              )
          )}
        {currentPlace && (
          <Overlay
            anchor={[currentPlace.latitude, currentPlace.longitude]}
            offset={[128, 180]}
          >
            <Place place={currentPlace} />
          </Overlay>
        )}
      </Map>
    </>
  )
}
