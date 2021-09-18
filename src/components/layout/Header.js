import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'

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
export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      <Logos to='/' aria-label='Accueil'>
        <Marianne />
        <Ademe />
      </Logos>
      {props.children}
    </Wrapper>
  )
}
