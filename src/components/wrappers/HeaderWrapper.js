import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import Header from 'components/layout/Header'
import Title from 'components/misc/Title'

const StyledHeader = styled(Header)`
  ${(props) => props.theme.mq.small} {
    &:before {
      content: ${(props) => (props.small ? '""' : 'none')};
      position: absolute;
      bottom: 0;
      left: -0.75rem;
      right: -0.75rem;
      height: 0.125rem;
      background-color: ${(props) => props.theme.colors.second};
    }
  }
`
export default function FooterWrapper() {
  const location = useLocation()
  return (
    <StyledHeader small={location.pathname !== '/'}>
      {location.pathname !== '/' && <Title small />}
    </StyledHeader>
  )
}
