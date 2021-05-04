import React, { useContext } from 'react'
import styled from 'styled-components'

import WasteContext from 'utils/WasteContext'
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
  opacity: ${(props) => (props.isFetching ? 0 : 1)};
  transition: opacity 1500ms 1500ms;

  ${(props) => props.theme.mq.small} {
    padding-bottom: 0;
  }
`
export default function SuggestionsWrapper() {
  const { isFetching } = useContext(WasteContext)

  return (
    <Wrapper>
      <Content isFetching={isFetching}>
        <Suggestions>
          En panne d’inspiration ? Essayez une des suggestions ci‑dessous.
        </Suggestions>
      </Content>
    </Wrapper>
  )
}
