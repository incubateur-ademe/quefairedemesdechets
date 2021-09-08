import React from 'react'
import styled from 'styled-components'

import ademe from 'components/layout/footer/ademe.jpg'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Logo from 'components/base/Logo'

const Wrapper = styled.div``
const Logos = styled(MagicLink)`
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  background-color: #fff;
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
export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      <Logos to='/'>
        <Marianne />
        <Ademe src={ademe} alt='ADEME' />
        <StyledLogo />
      </Logos>
      {props.children}
    </Wrapper>
  )
}
