import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLocation } from 'react-router-dom'

import { useWaste } from 'utils/api'
import UXContext from 'utils/UXContext'

const fetched = keyframes`
  from {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100%);
  }
  50.1% {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`
const Wrapper = styled.h1`
  position: relative;
  z-index: 101;
  left: ${(props) => (props.small ? 100 : 50)}%;
  transform: translate(
    ${(props) => (props.small ? '-100%' : '-50%')},
    ${(props) => (props.small ? '-3.5rem' : 0)}
  );
  margin: ${(props) => (props.small ? '0' : '4rem')} 0
    ${(props) => (props.small ? '0' : '3rem')};
  font-size: ${(props) => (props.small ? 1.5 : 2.5)}rem;
  transition: all 300ms ease-out;

  ${(props) => props.theme.mq.small} {
    margin-bottom: ${(props) => (props.small ? '0' : '3rem')};
    font-size: ${(props) => (props.small ? '0.5rem' : '6.5vw')};
  }
`
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
export default function Title() {
  let location = useLocation()

  const { isFetching } = useWaste()
  const waste = useWaste()
  console.log(waste)
  const { binFlight, setBinFlight } = useContext(UXContext)

  return (
    <Wrapper small={location.pathname !== '/'}>
      Que Faire de mes{' '}
      <Color
        onClick={() => {
          if (!binFlight) {
            setBinFlight(true)
            setTimeout(() => setBinFlight(false), 4000)
          }
        }}
        isFetching={isFetching}
      >
        Déchets
      </Color>{' '}
      ?
    </Wrapper>
  )
}
