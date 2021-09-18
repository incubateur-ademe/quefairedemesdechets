import React, { useState, useContext } from 'react'
import styled, { keyframes, ThemeContext } from 'styled-components'
import { Map, Marker, Overlay } from 'pigeon-maps'

import { usePlaces } from 'utils/api'
import Address from './mapWrapper/Address'
import Switch from './mapWrapper/Switch'
import Place from './mapWrapper/Place'
import List from './mapWrapper/List'

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
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity 600ms;
`
const Loader = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.125rem;
  width: 100%;

  ${(props) => props.theme.mq.small} {
    top: 0;
    bottom: auto;
    height: 0.5rem;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.second};
    transform: scaleX(0);
    animation: ${(props) => (props.isFetching ? fetching : 'none')} 1s linear
      infinite;
  }
`
export default function MapWrapper(props) {
  const [list, setList] = useState(false)

  const [address, setAddress] = useState({
    label: '',
    longitude: null,
    latitude: null,
  })
  const [center, setCenter] = useState([47.5, 2])
  const [zoom, setZoom] = useState(4.5)

  const [currentPlace, setCurrentPlace] = useState(null)

  const { data, isFetching } = usePlaces(center, zoom, props.product)

  const themeContext = useContext(ThemeContext)

  function mapTiler(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/voyager/256/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }.png?key=O05Aqy8ZzG7HT99FQ5PR#7.4/`
  }

  return (
    <>
      <Address
        address={address.label}
        setAddress={setAddress}
        setCenter={setCenter}
        setZoom={setZoom}
      />
      <Switch setList={setList} list={list} />
      <Loader isFetching={isFetching} />
      <Cache visible={!address.label} />
      {list ? (
        <List data={data} address={address} />
      ) : (
        <Map
          provider={mapTiler}
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
              <Place place={currentPlace} address={address} />
            </Overlay>
          )}
        </Map>
      )}
    </>
  )
}
