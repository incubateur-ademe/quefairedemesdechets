import React from 'react'
import styled from 'styled-components'

import ademe from 'components/layout/footer/ademe.jpg'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Logo from 'components/base/Logo'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1.25rem;
  margin-bottom: 3rem;
`
const Logos = styled(MagicLink)`
  display: flex;
  align-items: center;
  margin: 0 -0.75rem 1.25rem;
  padding-right: 0.75rem;
  background-color: #fff;

  ${(props) => props.theme.mq.small} {
    width: calc(100% + 1.5rem);
  }
`
const Ademe = styled.img`
  width: 4.9375rem;
  height: auto;
`
const StyledLogo = styled(Logo)``
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
