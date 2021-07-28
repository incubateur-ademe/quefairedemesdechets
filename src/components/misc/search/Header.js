import React from 'react'
import styled from 'styled-components'

import ademe from 'components/layout/footer/ademe.jpg'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Logo from 'components/base/Logo'

const Wrapper = styled(MagicLink)`
  display: flex;
  align-items: center;
`
const Ademe = styled.img`
  width: 4.9375rem;
  height: auto;
  ${(props) => props.theme.mq.small} {
    width: 2.75rem;
  }
`
const StyledLogo = styled(Logo)`
  ${(props) => props.theme.mq.small} {
    width: 4rem;
    height: auto;
  }
`
export default function Header() {
  return (
    <Wrapper to='/'>
      <Marianne />
      <Ademe src={ademe} alt='ADEME' />
      <StyledLogo />
    </Wrapper>
  )
}
