import React, { useContext } from 'react'
import styled from 'styled-components'

import { useWaste } from 'utils/api'
import UXContext from 'utils/UXContext'
import MagicLink from 'components/base/MagicLink'

const StyledMagicLink = styled(MagicLink)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
`
const Wrapper = styled.h1`
  position: relative;
  margin-bottom: ${(props) => (props.small ? 0 : 2.5)}rem;
  font-size: ${(props) => (props.small ? 1.5 : 2.5)}rem;
  text-align: ${(props) => (props.small ? 'left' : 'center')};

  ${(props) => props.theme.mq.medium} {
    font-size: ${(props) => (props.small ? 1.125 : 2)}rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.small ? 1 : 1.25)}rem;
  }
`
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`
export default function Title(props) {
  const { isFetching } = useWaste()
  const { binFlight, setBinFlight } = useContext(UXContext)

  return (
    <StyledMagicLink to='/'>
      <Wrapper small={props.small} as={props.small ? 'h2' : 'h1'}>
        Que Faire de{props.small && <br />} mes
        <span
          dangerouslySetInnerHTML={{
            __html: `&nbsp;`,
          }}
        />
        <Color
          onClick={(e) => {
            if (!binFlight && !props.small) {
              setBinFlight(true)
              setTimeout(() => setBinFlight(false), 4000)
            }
          }}
          isFetching={isFetching}
        >
          Déchets
        </Color>
        <span
          dangerouslySetInnerHTML={{
            __html: `&nbsp;`,
          }}
        />
        ?
      </Wrapper>
    </StyledMagicLink>
  )
}
