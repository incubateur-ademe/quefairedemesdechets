import React from 'react'
import styled from 'styled-components'

import useMobileDetect from 'hooks/useMobileDetect'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.tr`
  &:nth-child(2n) {
    background-color: ${(props) => props.theme.colors.secondLight};
  }
  td {
    padding: 0.6rem 1.2rem;
  }
`
export default function Line(props) {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper key={props.place.id}>
      <td>{props.place.title}</td>
      <td
        dangerouslySetInnerHTML={{
          __html: props.place.address,
        }}
      />

      <td>
        {Math.round(props.place.distance / 10) / 100}
        <span
          dangerouslySetInnerHTML={{
            __html: '&nbsp',
          }}
        />
        km
      </td>
      <td>
        <MagicLink
          to={
            !isMobile
              ? `https://www.google.com/maps/dir/?api=1&origin=${props.address.latitude},${props.address.longitude}&destination=${props.place.latitude},${props.place.longitude}`
              : `geo:${props.place.latitude},${props.place.longitude}?q=${
                  props.place.latitude
                },${
                  props.place.longitude
                }(${props.place.address.reprops.placeAll('<br/>', '')})`
          }
        >
          Voir
          <span
            dangerouslySetInnerHTML={{
              __html: '&nbsp',
            }}
          />
          l'itinéraire
        </MagicLink>
      </td>
    </Wrapper>
  )
}
