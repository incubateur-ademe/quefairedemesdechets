import React from 'react'
import styled from 'styled-components'

import useMobileDetect from 'hooks/useMobileDetect'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.tr`
  &:nth-child(2n) {
    background-color: ${(props) => props.theme.colors.secondLight};
  }

  ${(props) => props.theme.mq.small} {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 1rem;
  }
`
const Cell = styled.td`
  padding: 0.6rem 1.2rem;

  ${(props) => props.theme.mq.small} {
    display: block;
    width: ${(props) => (props.small ? 50 : 100)}%;
    padding: 0;
    text-align: ${(props) => (props.right ? 'right' : 'left')};
  }
`
export default function Line(props) {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper key={props.place.id}>
      <Cell>
        <strong>{props.place.title}</strong>
      </Cell>
      <Cell
        dangerouslySetInnerHTML={{
          __html: props.place.address,
        }}
      />

      <Cell small>
        {Math.round(props.place.distance / 10) / 100}
        <span
          dangerouslySetInnerHTML={{
            __html: '&nbsp',
          }}
        />
        km
      </Cell>
      <Cell small right>
        <MagicLink
          to={
            !isMobile
              ? `https://www.google.com/maps/dir/?api=1&origin=${props.address.latitude},${props.address.longitude}&destination=${props.place.latitude},${props.place.longitude}`
              : `geo:${props.place.latitude},${props.place.longitude}?q=${
                  props.place.latitude
                },${props.place.longitude}(${props.place.address.replaceAll(
                  '<br/>',
                  ''
                )})`
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
      </Cell>
    </Wrapper>
  )
}
