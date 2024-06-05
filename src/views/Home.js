import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useWaste } from 'utils/api'
import GifTitle from 'components/misc/GifTitle'
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
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFocus(!window.location.search.includes('iframe'))
    }
  }, [])

  return (
    <div>
      <GifTitle />
      <Wrapper>
        <SearchBar isFetched={isFetched} focus={focus}/>
      </Wrapper>
      <SuggestionsWrapper />
    </div>
  )
}

