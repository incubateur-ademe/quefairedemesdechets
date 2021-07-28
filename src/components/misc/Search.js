import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLocation } from 'react-router-dom'

import WasteContext from 'utils/WasteContext'
import UXContext from 'utils/UXContext'
import SearchBar from './search/SearchBar'
import Header from './search/Header'

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
const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3.5rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 4.5rem;
  }
`
const Title = styled.h1`
  position: relative;
  z-index: 101;
  margin: ${(props) => (props.small ? '0' : '3rem')} 0;
  font-size: ${(props) => (props.small ? '0' : '3rem')};
  text-align: center;
  opacity: ${(props) => (props.small ? 0 : 1)};
  transition: all 400ms ease-out;

  ${(props) => props.theme.mq.small} {
    margin-bottom: ${(props) => (props.small ? '0' : '3rem')};
    font-size: ${(props) => (props.small ? '0.5rem' : '6.5vw')};
  }
`
const Color = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    bottom: 0.1rem;
    left: 0;
    right: 0;
    height: 0.25rem;
    border-radius: 0.125rem;
    background-color: ${(props) => props.theme.colors.ter};
    animation: ${(props) => !props.isFetching && fetched} 350ms linear 750ms;
    ${(props) => props.theme.mq.small} {
      bottom: 0;
      height: 0.7vw;
    }
  }
`
const StyledSearchBar = styled(SearchBar)`
  font-size: ${(props) => (props.small ? 0.8 : 1)}rem;
  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
export default function Search() {
  let location = useLocation()
  const [small, setSmall] = useState(false)
  useEffect(() => {
    setSmall(location.pathname !== '/')
  }, [location])

  const { isFetched, isFetching } = useContext(WasteContext)

  const { binFlight, setBinFlight } = useContext(UXContext)

  return (
    <Wrapper small={small}>
      <Header />
      <Title small={small}>
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
      </Title>
      <StyledSearchBar small={small} isFetched={isFetched} />
    </Wrapper>
  )
}
