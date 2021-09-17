import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 16rem;
  height: 10rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 1rem;
  user-select: text;
  pointer-events: initial;
`
const Handle = styled.svg`
  position: absolute;
  top: calc(100% - 0.4rem);
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: auto;
  & path {
    stroke: ${(props) => props.theme.colors.text};
    fill: ${(props) => props.theme.colors.background};
  }
`
export const Title = styled.h3``
export const Address = styled.address`
  font-size: 0.875rem;
`
export default function Place(props) {
  return (
    <Wrapper>
      <Title>{props.place.title}</Title>
      {props.place.hours && (
        <Address
          dangerouslySetInnerHTML={{
            __html: props.place.hours,
          }}
        />
      )}
      <Address
        dangerouslySetInnerHTML={{
          __html: props.place.address,
        }}
      />
      <Handle width='967' height='987' viewBox='0 0 967 987'>
        <path
          d='M64.7762 241.75L483.499 967L902.223 241.75'
          strokeWidth='100'
        />
      </Handle>
    </Wrapper>
  )
}
