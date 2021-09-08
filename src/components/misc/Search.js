import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { useWaste } from 'utils/api'
import SearchBar from './search/SearchBar'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
`
export default function Search() {
  let location = useLocation()

  const { isFetched } = useWaste()

  return (
    <Wrapper small={location.pathname !== '/'}>
      <SearchBar small={location.pathname !== '/'} isFetched={isFetched} />
    </Wrapper>
  )
}
