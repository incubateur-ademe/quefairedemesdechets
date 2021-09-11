import React, { useContext } from 'react'
import styled from 'styled-components'

import { useWaste } from 'utils/api'
import UXContext from 'utils/UXContext'

const Wrapper = styled.h2`
  position: relative;
  z-index: 101;
  font-size: ${(props) => (props.small ? 1.5 : 2.5)}rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
export default function Title(props) {
  const { isFetching } = useWaste()
  const { binFlight, setBinFlight } = useContext(UXContext)

  return (
    <Wrapper small={props.small}>
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
