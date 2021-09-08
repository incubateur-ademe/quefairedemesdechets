import React from 'react'
import styled from 'styled-components'

import Header from 'components/layout/Header'
import Title from 'components/misc/Title'

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export default function FooterWrapper() {
  return (
    <StyledHeader>
      <Title />
    </StyledHeader>
  )
}
