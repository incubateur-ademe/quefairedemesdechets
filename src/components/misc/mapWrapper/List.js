import React from 'react'
import styled from 'styled-components'

import Line from './list/Line'

const Wrapper = styled.div`
  height: calc(100% - 5rem);
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 5rem;
  font-size: 0.875rem;

  table {
    border-collapse: collapse;
  }
`
export default function List(props) {
  const getDistance = (origin, destination) => {
    const R = 6371e3 // metres
    const φ1 = (origin.latitude * Math.PI) / 180 // φ, λ in radians
    const φ2 = (destination.latitude * Math.PI) / 180
    const Δφ = ((destination.latitude - origin.latitude) * Math.PI) / 180
    const Δλ = ((destination.longitude - origin.longitude) * Math.PI) / 180

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // in metres
  }

  return (
    <Wrapper>
      <table>
        <tbody>
          {props.data &&
            props.data
              .map((place) => ({
                ...place,
                distance: getDistance(props.address, place),
              }))
              .sort((a, b) => (a.distance > b.distance ? 1 : -1))
              .map(
                (place) =>
                  place.latitude &&
                  place.longitude && (
                    <Line
                      key={place.id}
                      place={place}
                      address={props.address}
                    />
                  )
              )}
        </tbody>
      </table>
    </Wrapper>
  )
}
