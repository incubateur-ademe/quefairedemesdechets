import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Title = styled.p`
  text-align: center;
  margin-bottom: 1rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
const Listing = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledButton = styled(Button)`
  margin: 0.5rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    margin: 0.25rem;
    font-size: 0.75rem;
  }
`
export default function Suggestions(props) {
  return (
    <>
      <Title>{props.children}</Title>
      <Listing>
        <StyledButton to={'/dechet/masque-a-usage-unique'}>
          Masque à usage unique
        </StyledButton>
        <StyledButton to={'/dechet/aspirateur'}>Aspirateur</StyledButton>
        <StyledButton to={'/dechet/epluchures'}>Epluchures</StyledButton>
        <StyledButton to={'/dechet/vetements-(propres-et-secs)'}>
          Vêtements
        </StyledButton>
        <StyledButton to={'/dechet/capsules-de-cafe-ou-de-the'}>
          Capsules de café
        </StyledButton>
        <StyledButton to={'/dechet/meuble'}>Meuble</StyledButton>
        <StyledButton to={'/dechet/produit-chimique'}>
          Produit chimique
        </StyledButton>
      </Listing>
    </>
  )
}
