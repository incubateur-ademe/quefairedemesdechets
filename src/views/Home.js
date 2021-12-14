import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { useWaste } from 'utils/api'
import Title from 'components/misc/Title'
import SearchBar from 'components/misc/SearchBar'
import SuggestionsWrapper from './home/SuggestionsWrapper'

const Wrapper = styled.div`
  position: relative;
  height: 0rem;
  padding-top: 3rem;
  margin-bottom: calc(4.1rem + 3rem);
`
export default function Home() {
  const { isFetched } = useWaste()

  return (
    <div>
      <Title />
      <Wrapper>
        <SearchBar isFetched={isFetched} />
      </Wrapper>
      <SuggestionsWrapper />
    </div>
  )
}
