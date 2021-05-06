import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLocation } from 'react-router-dom'

import WasteContext from 'utils/WasteContext'
import SearchBar from './search/SearchBar'

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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: ${(props) => (props.small ? 0 : '25vh')};
  margin-bottom: 7.5rem;
  transition: height 400ms ease-out;

  ${(props) => props.theme.mq.small} {
    height: ${(props) => (props.small ? 0 : '6rem')};
    margin-bottom: 4.5rem;
  }
`
const Title = styled.h1`
  position: relative;
  z-index: 101;
  margin-bottom: ${(props) => (props.small ? '0' : '4rem')};
  font-size: ${(props) => (props.small ? '2rem' : '3rem')};
  text-align: center;
  opacity: ${(props) => (props.small ? 0 : 1)};
  transition: all 400ms ease-out;

  ${(props) => props.theme.mq.small} {
    margin-bottom: ${(props) => (props.small ? '0' : '3rem')};
    font-size: 6.5vw;
  }
`
const Color = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    bottom: 0.1rem;
    left: 0;
    right: 0;
    height: 0.25rem;
    border-radius: 0.125rem;
    background-color: ${(props) => props.theme.colors.ter};
    animation: ${(props) => props.isFetched && fetched} 350ms linear 750ms;
    ${(props) => props.theme.mq.small} {
      bottom: 0;
      height: 0.7vw;
    }
  }
`
export default function Search() {
  let location = useLocation()
  const [small, setSmall] = useState(false)
  useEffect(() => {
    setSmall(location.pathname !== '/')
  }, [location])

  const { isFetched } = useContext(WasteContext)

  return (
    <Wrapper small={small}>
      <Title small={small}>
        Que Faire de mes <Color isFetched={isFetched}>Déchets</Color> ?
      </Title>
      <SearchBar small={small} isFetched={isFetched} />
    </Wrapper>
  )
}
