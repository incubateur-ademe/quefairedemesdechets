import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps'

import { usePlaces } from 'utils/api'
import Address from './mapWrapper/Address'
import Place from './mapWrapper/Place'

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
const Loader = styled.div`
  position: relative;
  height: 0.5rem;
  width: 100%;

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
