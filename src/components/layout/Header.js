import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.25rem;
  margin-bottom: 3rem;
`
const Logos = styled(MagicLink)`
  display: flex;
  align-items: center;
  margin-left: -0.75rem;
  background-color: #fff;
`
const Ademe = styled.img`
  display: block;
  width: 4.9375rem;
  height: auto;
`
export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      <Logos to='/' aria-label='Accueil'>
        <Marianne />
        <Ademe src={ademe} alt='ADEME' />
      </Logos>
      {props.children}
    </Wrapper>
  )
}
