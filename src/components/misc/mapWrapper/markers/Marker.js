import React from 'react'
import styled from 'styled-components'

const Icon = styled.svg`
  width: 1.5rem;
  height: auto;
  transform: translate(-50%, -100%);
  cursor: pointer;
  pointer-events: initial;

  & path {
    fill: ${(props) => props.theme.colors.main};
  }
`
const Wrapper = styled.div`
  position: relative;
  z-index: 100;
  width: 16rem;
  padding: 1rem;
  transform: translate(-50%, calc(-100% - 1rem));
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: 1rem;
  user-select: text;
  pointer-events: initial;
`
const Handle = styled.svg`
  position: absolute;
  top: calc(100% - 0.38rem);
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: auto;
  & path {
    stroke: ${(props) => props.theme.colors.main};
    fill: ${(props) => props.theme.colors.background};
  }
`
export const Title = styled.h3``
export const Address = styled.address`
  font-size: 0.875rem;
`
export default function Marker(props) {
  return props.open ? (
    <Wrapper open={props.open}>
      <Title>{props.title}</Title>
      <Address>{props.children}</Address>
      <Handle width='967' height='987' viewBox='0 0 967 987'>
        <path
          d='M64.7762 241.75L483.499 967L902.223 241.75'
          strokeWidth='100'
        />
      </Handle>
    </Wrapper>
  ) : (
    <Icon
      onClick={() =>
        props.setCurrentMarker({
          id: props.id,
          latitude: props.latitude,
          longitude: props.longitude,
        })
      }
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
    >
      <path
        d='M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
			c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
			c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z'
      />
    </Icon>
  )
}
