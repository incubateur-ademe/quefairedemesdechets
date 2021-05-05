import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import WasteContext from 'utils/WasteContext'
import SearchContext from 'utils/SearchContext'
import Suggestions from 'components/misc/Suggestions'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`
const Content = styled.div`
  padding-bottom: 1rem;
  opacity: ${(props) => (props.isFetched ? 1 : 0)};
  transition: opacity 1500ms 1500ms;

  ${(props) => props.theme.mq.small} {
    padding-bottom: 0;
  }
`
export default function SuggestionsWrapper() {
  const { isFetched } = useContext(WasteContext)

  const { setSearch } = useContext(SearchContext)
  useEffect(() => {
    setSearch('')
  }, [setSearch])

  return (
    <Wrapper>
      <Content isFetched={isFetched}>
        <Suggestions>
          En panne d’inspiration ? Essayez une des suggestions ci‑dessous.
        </Suggestions>
      </Content>
    </Wrapper>
  )
}
