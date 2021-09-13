import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import { useWaste } from 'utils/api'
import SearchContext from 'utils/SearchContext'
import Suggestions from 'components/misc/Suggestions'

const Wrapper = styled.div`
  padding-bottom: 1rem;

  ${(props) => props.theme.mq.small} {
    padding-bottom: 0;
  }
`
export default function SuggestionsWrapper() {
  const { setSearch } = useContext(SearchContext)
  useEffect(() => {
    setSearch('')
  }, [setSearch])

  return (
    <Wrapper>
      <Suggestions>
        En panne d’inspiration ? Essayez une des suggestions ci‑dessous.
      </Suggestions>
    </Wrapper>
  )
}
