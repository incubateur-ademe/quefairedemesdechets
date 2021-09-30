import React from 'react'
import styled from 'styled-components'
import { useQueryParam, ArrayParam } from 'use-query-params'

import { useSuggestions } from 'utils/api'
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
  const [suggestions] = useQueryParam('suggestions', ArrayParam)

  const { data } = useSuggestions(suggestions)

  return (
    <>
      <Title>{props.children}</Title>
      {suggestions ? (
        <Listing>
          {data &&
            data.map((suggestion) => (
              <StyledButton
                to={`/dechet/${suggestion.slug}`}
                key={suggestion.slug}
              >
                {suggestion.Nom}
              </StyledButton>
            ))}
        </Listing>
      ) : (
        <Listing>
          <StyledButton to={'/dechet/masque-a-usage-unique'}>
            Masque à usage unique
          </StyledButton>
          <StyledButton to={'/dechet/cable'}>Câble</StyledButton>
          <StyledButton to={'/dechet/telephone-mobile'}>
            Téléphone mobile
          </StyledButton>
          <StyledButton to={'/dechet/medicaments'}>Médicaments</StyledButton>
          <StyledButton to={'/dechet/capsules-de-cafe-ou-de-the'}>
            Capsules de café
          </StyledButton>
          <StyledButton to={'/dechet/chaussures'}>Chaussures</StyledButton>
          <StyledButton to={'/dechet/vetement-(propre-et-sec)'}>
            Vêtements
          </StyledButton>
        </Listing>
      )}
    </>
  )
}
